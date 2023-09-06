import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import ms from 'ms';
import { Session } from '../session/entities/session.entity';
import { SessionService } from '../session/session.service';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/users.service';
import { AuthDto, RegisterDto } from './dto';
import { LoginResponseType } from './presenters/login-response.presenter';
import { JwtRefreshPayloadType } from './strategies/types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async refreshToken(
    data: Pick<JwtRefreshPayloadType, 'sessionId'>,
  ): Promise<Omit<LoginResponseType, 'user'>> {
    const session = await this.sessionService.findOne({
      where: {
        id: data.sessionId,
      },
    });

    if (!session) throw new UnauthorizedException('Unauthorized');

    const { accessToken, refreshToken, tokenExpires } =
      await this.generateKeyPairSync({
        id: session.user.id,
        email: session.user.email,
        sessionId: session.id,
      });

    return {
      accessToken,
      refreshToken,
      tokenExpires,
    };
  }

  async register(registerDto: RegisterDto): Promise<User> {
    try {
      // Create user
      const newUser = await this.userService.create({
        ...registerDto,
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

  async login(authDto: AuthDto): Promise<LoginResponseType> {
    const user = await this.userService.finByEmail(authDto.email);

    if (!user) throw new ForbiddenException('User not found');

    const passwordMatched = await bcrypt.compare(
      authDto.password,
      user.password,
    );
    if (!passwordMatched)
      throw new UnprocessableEntityException('Incorrect Password');

    const session = await this.sessionService.create({ user });
    const payload = { id: user.id, email: user.email, sessionId: session.id };
    const { accessToken, refreshToken, tokenExpires } =
      await this.generateKeyPairSync(payload);

    delete user.password;

    return {
      accessToken,
      refreshToken,
      tokenExpires,
      user,
    };
  }

  private async generateKeyPairSync(payload: {
    id: User['id'];
    email: User['email'];
    sessionId?: Session['id'];
  }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });
    const tokenExpires = Date.now() + ms(tokenExpiresIn);
    console.log(tokenExpires);
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

    return {
      accessToken,
      refreshToken,
      tokenExpires: parseInt(tokenExpires.toString()),
    };
  }
}
