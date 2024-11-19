export interface AppConfig {
  port: number;
};

export interface DatabaseConfig {
    client: string;
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
    poolMin: number;
    poolMax: number;
};

interface Config {
  app: AppConfig;
  database: DatabaseConfig;
};

export function configuration(): Config {
  return {
    app: {
      port: +process.env.PORT
    },
    database: {
      client: process.env.DATABASE_CLIENT,
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_NAME,
      poolMin: +process.env.DATABASE_POOL_MIN,
      poolMax: +process.env.DATABASE_POOL_MAX,
    }
  }
}