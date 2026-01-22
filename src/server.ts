import app from "./app";
import { initDb } from "./database/init";

// Initialise database on start-up
initDb();

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}...`);
});
