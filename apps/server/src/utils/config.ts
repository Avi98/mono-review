import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from '@pr/common';
import * as Express from 'express';
import * as ExpressSession from 'express-session';
import { TypeormStore } from 'connect-typeorm';

console.log('\nbackend server is running on port:' + parseInt(env.port_BE));
console.log('\n');

export default () => ({
  port: parseInt(env.port_BE, 10) || 3030,
});

//setup session middleware
export const setupSession = (sessionStore: TypeormStore) => {
  Express().use(
    ExpressSession({
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      secret: env.db.SESSION_SECRET,
    }),
  );
};

console.log({ isDev: env.isDev });
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
    extra: {
      max: 25,
    },
  };
}
