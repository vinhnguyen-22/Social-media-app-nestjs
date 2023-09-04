import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsNotExist } from '../utils/validators/is-not-exists.validator';
import { User } from './entities/user.entity';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [IsNotExist, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
