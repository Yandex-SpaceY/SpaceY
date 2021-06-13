/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const path = require('path');

const app = express();
const { PORT = 3000 } = process.env;
const distFolder = `${__dirname}/dist`;

app.use(express.static(distFolder))
  .use((req, res) => {
    res.sendFile(path.resolve(`${distFolder}/index.html`));
  });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
