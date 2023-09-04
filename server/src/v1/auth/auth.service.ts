import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import ms from 'ms';
import { Repository } from 'typeorm';
import { Session } from '../session/entities/session.entity';
import { SessionService } from '../session/session.service';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/users.service';
import { AuthDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,

    private sessionService: SessionService,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async refreshToken(refreshToken: string): Promise<any> {
    try {
      // const session = await this.sessionService.findOne({
      //   where: {
      //     id: data.sessionId,
      //   },
      // });

      const verify = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('AUTH_REFRESH_SECRET'),
      });
      const user = await this.userRepository.findOneBy({
        email: verify.email,
        refreshToken,
      });

      if (user)
        return this.generateKeyPairSync({
          id: user.id,
          email: user.email,
        });
      else throw new BadRequestException('Invalid refresh token');
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }

  async register(registerDto: RegisterDto): Promise<User> {
    try {
      const hashedPassword = await this.hashPassword(registerDto.password);

      // Create user
      const newUser = await this.userService.create({
        ...registerDto,
        password: hashedPassword,
        refreshToken: 'token-string',
        gender: registerDto.gender == 1 ? true : false,
      });

      delete newUser.password;
      return newUser;
    } catch (error) {
      if (error.code == 'P2002') {
        throw new ForbiddenException('User with this email already exists');
      }
    }
  }

  async login(authDto: AuthDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: authDto.email },
    });

    if (!user) throw new ForbiddenException('User not found');

    const passwordMatched = bcrypt.compareSync(authDto.password, user.password);

    if (!passwordMatched) throw new ForbiddenException('Incorrect Password');

    delete user.password; // remove 1 field in the object

    const session = await this.sessionService.create(user);

    const payload = { id: user.id, email: user.email, sessionId: session.id };
    const tokens = await this.generateKeyPairSync(payload);
    return tokens;
  }

  private async generateKeyPairSync(payload: {
    id: number;
    email: string;
    sessionId?: Session['id'];
  }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });
    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [accessToken, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow('auth.secret', { infer: true }),
        expiresIn: tokenExpires,
      }),
      await this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow('auth.refreshSecret', {
          infer: true,
        }),
        expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
          infer: true,
        }),
      }),
    ]);

    await this.userRepository.update(
      { email: payload.email },
      { refreshToken: refreshToken },
    );
    return { accessToken, refreshToken };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
