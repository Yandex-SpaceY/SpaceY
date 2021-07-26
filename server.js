/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const path = require('path');

const app = express();
const { PORT = 3000 } = process.env;

app
  .use(express.static(__dirname))
  .use((req, res) => {
    res.sendFile(path.join(`${__dirname}/index.html`));
  });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
