import { registerAs } from '@nestjs/config';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import validateConfig from 'src/v1/utils/validate-config';
import { DatabaseConfig } from './config.type';

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => envValues.DB_URL)
  @IsString()
  DB_URL: string;

  @ValidateIf((envValues) => !envValues.DB_URL)
  @IsString()
  DB_TYPE: string;

  @ValidateIf((envValues) => !envValues.DB_URL)
  @IsString()
  DB_HOST: string;

  @ValidateIf((envValues) => !envValues.DB_URL)
  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  DB_PORT: number;

  @ValidateIf((envValues) => !envValues.DB_URL)
  @IsString()
  @IsOptional()
  DB_PASSWORD: string;

  @ValidateIf((envValues) => !envValues.DB_URL)
  @IsString()
  DB_NAME: string;

  @ValidateIf((envValues) => !envValues.DB_URL)
  @IsString()
  DB_USERNAME: string;

  @IsBoolean()
  @IsOptional()
  DB_SYNCHRONIZE: boolean;

  @IsInt()
  @IsOptional()
  DB_MAX_CONNECTIONS: number;

  @IsBoolean()
  @IsOptional()
  DB_SSL_ENABLED: boolean;

  @IsBoolean()
  @IsOptional()
  DB_REJECT_UNAUTHORIZED: boolean;

  @IsString()
  @IsOptional()
  DB_CA: string;

  @IsString()
  @IsOptional()
  DB_KEY: string;

  @IsString()
  @IsOptional()
  DB_CERT: string;
}

export default registerAs<DatabaseConfig>('db', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    url: process.env.DB_URL,
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    maxConnections: process.env.DB_MAX_CONNECTIONS
      ? parseInt(process.env.DB_MAX_CONNECTIONS, 10)
      : 100,
    sslEnabled: process.env.DB_SSL_ENABLED === 'true',
    rejectUnauthorized: process.env.DB_REJECT_UNAUTHORIZED === 'true',
    ca: process.env.DB_CA,
    key: process.env.DB_KEY,
    cert: process.env.DB_CERT,
  };
});
