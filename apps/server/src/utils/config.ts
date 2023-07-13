import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from '@pr/common';

console.log({ envProt: parseInt(env.port_BE) });
export default () => ({
  port: parseInt(env.port_BE, 10) || 3030,
});

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
    extra: {
      max: 25,
    },
  };
}
