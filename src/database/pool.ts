import "dotenv/config";
import { Pool, types } from "pg";

// 1082 is the OID for the PostgreSQL 'DATE' type
// This tells node-postgres to return the raw string from the DB
types.setTypeParser(1082, (val) => val);

export const pool: Pool = new Pool({
  connectionString: process.env.DATABASE_URL + "&sslmode=verify-full",
});
