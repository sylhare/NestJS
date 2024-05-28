import { join } from 'path';
import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config({ path: join(process.cwd(), '.env.local') });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  entities: [join(process.cwd(), 'src/typeorm/*/*.entity.ts')],
  migrations: [join(process.cwd(), 'migrations/*.ts')],
  logging: false,
};