import express from 'express';

const app = express();

// Sanity check
app.get('/', (req, res) => {
  res.status(200).send('Server is still alive');
});

export default app;
