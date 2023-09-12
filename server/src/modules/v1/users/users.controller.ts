import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
