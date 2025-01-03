export interface AppConfig {
  port: number;
  jwtSecret: string;
  jwtExpiresIn: string;
  cookieSameSite: string;
  cookieMaxAge: number;
  corsOrigin: string; 
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
      port: +process.env.PORT,
      jwtSecret: process.env.JWT_SECRET,
      jwtExpiresIn: process.env.JWT_EXPIRES_IN,
      cookieMaxAge: +process.env.COOKIE_MAX_AGE,
      cookieSameSite: process.env.COOKIE_SAME_SITE,
      corsOrigin: process.env.CORS_ORIGIN
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