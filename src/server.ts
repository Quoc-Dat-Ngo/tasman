import app from "./app";
import { pool } from "./pool";

const PORT = 3004;
const server = app.listen(PORT);

process.on("SIGINT", async () => {
  await pool.end();
  server.close(() => process.exit(0));
  console.log("Shutting down...");
});
