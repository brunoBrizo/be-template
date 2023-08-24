import { DataSource } from 'typeorm';
import { dataSourceOptions } from './typeorm-datasource.config';

export default new DataSource({
  ...dataSourceOptions,
  migrations: ['src/migrations/*'],
});
