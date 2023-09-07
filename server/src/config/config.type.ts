export type AppConfig = {
  nodeEnv: string;
  name: string;
  workingDirectory: string;
  frontendUrl?: string;
  backendUrl: string;
  port: number;
  apiPrefix: string;
  fallbackLanguage: string;
  headerLanguage: string;
};

export type DatabaseConfig = {
  url?: string;
  type?: string;
  host?: string;
  port?: number;
  password?: string;
  name?: string;
  username?: string;
  synchronize?: boolean;
  maxConnections: number;
  sslEnabled?: boolean;
  rejectUnauthorized?: boolean;
  ca?: string;
  key?: string;
  cert?: string;
};

export type AuthConfig = {
  secret?: string;
  expires?: string;
  refreshSecret?: string;
  refreshExpires?: string;
};
