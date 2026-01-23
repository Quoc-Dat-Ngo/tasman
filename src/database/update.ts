import { pool } from "./pool";

export const updateDb = async (): Promise<void> => {
  await pool.query(
    "ALTER TABLE majors ADD IF NOT EXISTS department_id INTEGER NOT NULL REFERENCES departments(department_id)",
  );
  // await pool.query("TRUNCATE TABLE courses RESTART IDENTITY CASCADE;");
  // await pool.query(
  //   "ALTER TABLE courses ALTER COLUMN course_code TYPE VARCHAR(16);",
  // );
};
