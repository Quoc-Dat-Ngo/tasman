// database/migrate.cli.ts  (or keep as migrate.ts if you prefer)
import { pool } from "../src/pool.js";
import { runMigrations } from "./migrate.js";

runMigrations(pool)
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
