import { env } from "./config/env.js";
import app from "./app.js";
import { pool } from "./pool.js";

const PORT = env.PORT;
const server = app.listen(PORT);

process.on("SIGINT", async () => {
  await pool.end();
  server.close(() => process.exit(0));
});
