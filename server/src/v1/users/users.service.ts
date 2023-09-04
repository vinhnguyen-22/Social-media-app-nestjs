import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll() {
    try {
      return await this.userRepository.find({
        select: [
          'id',
          'firstName',
          'lastName',
          'email',
          'status',
          'created_at',
          'updated_at',
        ],
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async finByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async create(userDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(
      this.userRepository.create({
        ...userDto,
      }),
    );
  }
}
