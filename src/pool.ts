import { Pool, types } from "pg";
import { env } from "./config/env.js";

// 1082 is the OID for the PostgreSQL 'DATE' type
// This tells node-postgres to return the raw string from the DB
types.setTypeParser(1082, (val) => val);

// Keep TIMESTAMP (without zone) as a string
// If you use this for things like "Office Hours" (9 AM everywhere),
// you don't want JS to add a timezone to it.
// types.setTypeParser(1114, (val) => val);

export const pool: Pool = new Pool({
  connectionString: env.DATABASE_URL,
});
