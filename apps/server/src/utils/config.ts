import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from '@pr/common';
import * as ExpressSession from 'express-session';
import { TypeormStore } from 'connect-typeorm';
import { NestExpressApplication } from '@nestjs/platform-express';

//setup session middleware
export const setupSession = (
  sessionStore: TypeormStore,
  app: NestExpressApplication,
  isDev: boolean,
) => {
  const oneDay = 1000 * 60 * 60 * 24;
  app.use(
    ExpressSession({
      name: env.session_name,
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      secret: env.db.SESSION_SECRET,
      cookie: {
        secure: isDev ? false : true,
        maxAge: oneDay,
        httpOnly: true,
        sameSite: isDev ? 'strict' : 'none',
      },
    }),
  );
};

const db: TypeOrmModuleOptions = {
  type: 'postgres',
  database: env.db.DATABASE,
  port: +env.db.PORT || 5432,
  username: env.db.USERNAME,
  password: env.db.PASSWORD,
  host: env.db.HOST,
  autoLoadEntities: true,
  connectTimeoutMS: 5000,
  synchronize: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
  extra: {
    max: 25,
  },
};

export function dbConfig(): TypeOrmModuleOptions {
  return db;
}
