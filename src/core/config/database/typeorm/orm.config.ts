import { DataSource, DataSourceOptions } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  database: 'postgres',
  username: 'postgres',
  password: 'postgres',
  schema: 'public',
  serviceName: 'postgres',
  entities: [__dirname + './../../../../**/*.entity-schema.{ts,js}'],
} as DataSourceOptions);

export default dataSource;
