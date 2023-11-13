import { DataSource, DataSourceOptions } from 'typeorm';
import { dbConfig } from './config';

const AppDataSource = new DataSource(dbConfig() as DataSourceOptions);
AppDataSource.initialize();

export default AppDataSource;
