import app from "./app";
import { initDb } from "./database/init";
import { pool } from "./database/pool";

// Initialise database on start-up
initDb();

const PORT = 3004;
const server = app.listen(PORT);

process.on("SIGINT", async () => {
  await pool.end();
  server.close(() => process.exit(0));
});
