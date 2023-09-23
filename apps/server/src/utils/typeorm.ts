import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenv.config();

//
//@TODO: parse the envs for productions
const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DB_DATABASE || 'prdb',
  port: +process.env.DB_DATABASE || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_DATABASEHOST || 'localhost',
  connectTimeoutMS: 5000,
  entities: [__dirname + './src/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'develop' ? true : false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  logging: process.env.NODE_ENV === 'develop' ? true : false,
  extra: {
    max: 25,
  },
};

export default new DataSource(typeormConfig);
