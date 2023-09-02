import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { AuthDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async refreshToken(refresh_token: string): Promise<any> {
    try {
      const verify = await this.jwtService.verifyAsync(refresh_token, {
        secret: this.configService.get<string>('AUTH_JWT_SECRET'),
      });
      const user = await this.userRepository.findOneBy({
        email: verify.email,
        refresh_token,
      });
      console.log(user);
      if (user)
        return this.generateKeyPairSync({ id: user.id, email: user.email });
      else throw new BadRequestException('Invalid refresh token');
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }

  async register(registerDto: RegisterDto): Promise<User> {
    try {
      const hashedPassword = await this.hashPassword(registerDto.password);
      const newUser = await this.userRepository.save({
        ...registerDto,
        gender: registerDto.gender == 1 ? true : false,
        refresh_token: 'refresh-token-string',
        password: hashedPassword,
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

    const payload = { id: user.id, email: user.email };
    const tokens = await this.generateKeyPairSync(payload);
    return tokens;
  }

  private async generateKeyPairSync(payload: { id: number; email: string }) {
    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('AUTH_JWT_SECRET'),
      expiresIn: '1h',
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('AUTH_JWT_SECRET'),
      expiresIn: '1d',
    });

    await this.userRepository.update(
      { email: payload.email },
      { refresh_token },
    );
    return { access_token, refresh_token };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
