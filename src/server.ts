import app from './app';
import { initDb } from './database/init';
import { updateDb } from './database/update';

// Initialise database on start-up
initDb();
updateDb();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}...`);
});
