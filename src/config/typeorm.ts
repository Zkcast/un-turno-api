import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const typeOrmConfig = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoloadEntities: true,
  logging: true,
  synchronize: true,
  dropSchema: true,
};

export default registerAs('typeorm', () => typeOrmConfig);
export const connectionSource = new DataSource(
  typeOrmConfig as DataSourceOptions,
);
