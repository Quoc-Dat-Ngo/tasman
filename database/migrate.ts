import "../src/config/env";
import fs from "fs";
import { resolve, join } from "path";
import { pool } from "../src/pool";

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
    console.log("Processing migration:", file);

    const check = await pool.query(
      `
        SELECT 1
        FROM schema_migrations
        WHERE filename = $1;
      `,
      [file],
    );

    if (check.rowCount && check.rowCount > 0) {
      console.log("Already executed, skipping:", file);
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

      console.log("Successfully executed:", file);
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error("Failed migration:", file);
      throw error;
    }
  }
}

async function runMigrations() {
  await ensureMigrationTable();
  await executeMigrationFiles();
  process.exit(0);
}

runMigrations().catch((err) => {
  console.error("Migration runner failed:", err);
  process.exit(1);
});
