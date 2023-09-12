import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const AppDataSource = new DataSource({
  type: process.env.DB_TYPE,
  url: process.env.DB_URL,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  dropSchema: false,
  keepConnectionAlive: true,
  logging: process.env.NODE_ENV !== 'production',
  entities: [
    'src/modules/**/*.entity{.ts,.js}',
    'src/modules/**/*.view-entity{.ts,.js}',
  ],
  migrations: ['src/database/migrations/*{.ts,.js}'],
} as DataSourceOptions);

export default AppDataSource;
