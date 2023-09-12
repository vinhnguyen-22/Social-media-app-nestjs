import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { AuthModule } from './modules/v1/auth/auth.module';
import { MailModule } from './modules/v1/mail/mail.module';
import { PostModule } from './modules/v1/post/post.module';
import { SessionModule } from './modules/v1/session/session.module';
import { UserModule } from './modules/v1/users/users.module';
import { MailerController } from './modules/v1/mailer/mailer.controller';
import { MailerModule } from './modules/v1/mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    AuthModule,
    UserModule,
    JwtModule,
    PostModule,
    SessionModule,
    MailModule,
    MailerModule,
  ],
  controllers: [AppController, MailerController],
  providers: [AppService],
})
export class AppModule {}
