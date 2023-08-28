import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './v1/auth/auth.controller';
import { AuthModule } from './v1/auth/auth.module';
import { AuthService } from './v1/auth/auth.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
