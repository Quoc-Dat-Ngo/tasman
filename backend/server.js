import express from 'express';
import 'dotenv/config';
import { initDb } from './database/initDb.js';
import { resetDb } from './database/resetDb.js';

const app = express();
const PORT = 3000;

// Initialise database schema
initDb();
// resetDb();

// Sanity check
app.get('/', (req, res) => {
  res.status(200).send('App is still alive');
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
