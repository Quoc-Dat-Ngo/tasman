import { env } from "./config/env";
import app from "./app";
import { pool } from "./pool";

const PORT = env.PORT;
const server = app.listen(PORT);

process.on("SIGINT", async () => {
  await pool.end();
  server.close(() => process.exit(0));
  console.log("Shutting down...");
});
