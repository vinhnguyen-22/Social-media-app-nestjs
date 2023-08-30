import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DATA_BASE_CONFIGURATION } from 'src/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: DATA_BASE_CONFIGURATION.postgresConnectionString,
        },
      },
    });
  }
}
