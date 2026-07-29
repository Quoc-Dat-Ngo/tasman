import dotenv from "dotenv";
import { Pool } from "pg";
import { runMigrations } from "../database/migrate.js";

dotenv.config({ path: ".env.test", override: true });

console.log(process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

try {
  await runMigrations(pool);
} finally {
  await pool.end();
}
