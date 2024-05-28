import { dataSourceOptions } from './database.option';
import { DataSource } from 'typeorm';

const datasource = new DataSource(dataSourceOptions);

export default datasource;