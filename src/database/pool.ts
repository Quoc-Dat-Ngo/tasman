import 'dotenv/config';
import { Pool } from 'pg';

console.log('DATABASE CONNECTION URL: ', process.env.DATABASE_URL);

export const pool: Pool = new Pool({
  connectionString: process.env.DATABASE_URL + '&sslmode=verify-full',
});
