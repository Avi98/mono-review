import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from '@pr/common';
import * as ExpressSession from 'express-session';
import { TypeormStore } from 'connect-typeorm';
import { NestExpressApplication } from '@nestjs/platform-express';

console.log('\nbackend server is running on port:' + parseInt(env.port_BE));
console.log('\n');

export default () => ({
  port: parseInt(env.port_BE, 10) || 3030,
});

//setup session middleware
export const setupSession = (
  sessionStore: TypeormStore,
  app: NestExpressApplication,
) => {
  app.use(
    ExpressSession({
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      secret: env.db.SESSION_SECRET,
    }),
  );
};

export function dbConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    database: env.db.DATABASE,
    port: +env.db.PORT || 5432,
    username: env.db.USERNAME,
    password: env.db.PASSWORD,
    host: env.db.HOST,
    connectTimeoutMS: 5000,
    autoLoadEntities: true,
    synchronize: env.isDev ? true : false,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    logging: env.isDev ? true : false,
    extra: {
      max: 25,
    },
  };
}
