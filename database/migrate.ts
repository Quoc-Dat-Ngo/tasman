import { env } from "../src/config/env.js";
import fs from "fs";
import { resolve, join } from "path";
import { pool } from "../src/pool.js";

console.log(env.DATABASE_URL);

const pathToMigration = resolve("database/migrations");

async function ensureMigrationTable() {
  await pool.query(
    `
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `,
  );
}

async function executeMigrationFiles() {
  const migrationFiles = fs
    .readdirSync(pathToMigration)
    .filter((file) => file.endsWith(".sql"))
    .sort(); // ensure deterministic order (001, 002, 003...)

  for (const file of migrationFiles) {
    const check = await pool.query(
      `
        SELECT 1
        FROM schema_migrations
        WHERE filename = $1;
      `,
      [file],
    );

    if (check.rowCount && check.rowCount > 0) {
      continue;
    }

    const filePath = join(pathToMigration, file);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });

    try {
      await pool.query("BEGIN");
      await pool.query(fileContent);
      await pool.query(
        `
          INSERT INTO schema_migrations (filename, executed_at)
          VALUES ($1, DEFAULT);
        `,
        [file],
      );
      await pool.query("COMMIT");
      console.log("Success");
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error(error);
      throw error;
    }
  }
}

async function runMigrations() {
  console.log("Starting migrations...");
  await ensureMigrationTable();

  console.log("Migration table checked");
  await executeMigrationFiles();

  console.log("Migration execution completed");
  process.exit(0);
}

runMigrations().catch((_err) => {
  process.exit(1);
});
