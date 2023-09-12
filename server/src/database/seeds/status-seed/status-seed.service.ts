import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/modules/v1/statuses/entities/status.entity';
import { StatusEnum } from 'src/modules/v1/statuses/statuses.enum';
import { Repository } from 'typeorm';

@Injectable()
export class StatusSeedService {
  constructor(
    @InjectRepository(Status)
    private repository: Repository<Status>,
  ) {}

  async run() {
    const countUser = await this.repository.count({
      where: {
        id: StatusEnum.active,
      },
    });

    if (!countUser) {
      await this.repository.save(
        this.repository.create({
          id: StatusEnum.active,
          name: 'active',
        }),
      );
    }

    const countAdmin = await this.repository.count({
      where: {
        id: StatusEnum.inactive,
      },
    });

    if (!countAdmin) {
      await this.repository.save(
        this.repository.create({
          id: StatusEnum.inactive,
          name: 'inactive',
        }),
      );
    }
  }
}
