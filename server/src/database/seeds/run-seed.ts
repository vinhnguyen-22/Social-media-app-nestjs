import { NestFactory } from '@nestjs/core';
import { RoleSeedService } from './role-seed/role-seed.service';
import { SeedModule } from './seed.module';
import { StatusSeedService } from './status-seed/status-seed.service';
import { UserSeedService } from './user-seed/user-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(StatusSeedService).run();
  await app.get(RoleSeedService).run();
  await app.get(UserSeedService).run();

  await app.close();
};

void runSeed();
