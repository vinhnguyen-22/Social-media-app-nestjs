import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthDto, RegisterDto } from './dto';
import { LoginResponseType } from './presenters/login-response.presenter';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async logout(@Request() request): Promise<void> {
    await this.authService.logout({
      sessionId: request.user.sessionId,
    });
  }

  @ApiBearerAuth()
  @Get('me')
  @SerializeOptions({
    groups: ['me'],
  })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public me(@Request() request): Promise<User | null> {
    return this.authService.me(request.user);
  }

  @ApiOkResponse({
    type: AuthDto,
    description: 'User info with access token',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: AuthDto): Promise<LoginResponseType> {
    return this.authService.login(body);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() body: RegisterDto): Promise<User> {
    return this.authService.register(body);
  }

  @Post('refresh-token')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  refreshToken(@Request() request): Promise<Omit<LoginResponseType, 'user'>> {
    return this.authService.refreshToken({
      sessionId: request.user.sessionId,
    });
  }
}
