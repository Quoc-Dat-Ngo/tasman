import app from "./app";
import { initDb } from "./database/init";
import { pool } from "./database/pool";
// import { updateDb } from "./database/update";

// Initialise database on start-up
initDb();
// updateDb();

const PORT = 3004;
const server = app.listen(PORT);

process.on("SIGINT", async () => {
  await pool.end();
  server.close(() => process.exit(0));
});
