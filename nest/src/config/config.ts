import { ConfigProps } from './config.interface';

export const config = (): ConfigProps => ({
  port: parseInt(process.env.NEST_PORT, 10) || 3000,
  environment: process.env.ENV_NAME,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
    log: (process.env.DB_LOGS || 'error').split(',') as ('query' | 'error')[],
  },
});
