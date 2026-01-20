const express = require('express');

const app = express();
const PORT = 3000;

// Sanity check
app.get('/', (req, res) => {
  res.status(200).send('App is still alive');
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
