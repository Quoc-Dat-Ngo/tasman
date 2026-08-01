import { pool } from "../helpers/db.js";

afterAll(async () => {
  await pool.end();
});
