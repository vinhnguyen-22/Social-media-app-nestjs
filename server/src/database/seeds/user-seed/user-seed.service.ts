import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/v1/roles/roles.enum';
import { User } from 'src/v1/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count({
      where: { role: { id: RoleEnum.admin } },
    });

    if (!countAdmin) {
      await this.repository.save(
        this.repository.create({
          firstName: 'vincent',
          lastName: 'azure',
          email: 'vincent@gmail.com',
          password: '123456',
          role: { id: RoleEnum.admin, name: 'Admin' },
          phoneNumber: '0344488761',
          status: 1,
          gender: true,
        }),
      );
    }
    const countUser = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.user,
        },
      },
    });

    if (!countUser) {
      await this.repository.save(
        this.repository.create({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'secret',
          role: {
            id: RoleEnum.user,
            name: 'User',
          },
          phoneNumber: '0344488760',
          status: 1,
          gender: true,
        }),
      );
    }
  }
}
