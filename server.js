/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;

app
  .use(express.static(__dirname))
  .use((req, res) => {
    res.sendFile('./index.html');
  });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
