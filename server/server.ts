import path from 'path';
import express from 'express';
import compression from 'compression';

import { sequelize } from './sequelize/models';
import apiRoutes from './sequelize/routes';
import { serverRenderer, hotReload } from './middlewares';
import { DIST_DIR, IS_DEV, SRC_DIR } from '../webpack/constants';

const { PORT = 3000 } = process.env;
const app = express();

const sequelizeSync = async () => {
  try {
    await sequelize.sync();
    console.log('Connection has been established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

app
  .use(express.json())
  .use(compression())
  .use(express.static(path.resolve(DIST_DIR)))
  .use('/api', apiRoutes);

if (IS_DEV) {
  app.get('/*', [...hotReload()]);
} else {
  app.get('/sw.js', (req, res) => {
    res.sendFile(path.join(SRC_DIR, 'sw.js'));
  });
}

app.get('/*', serverRenderer);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelizeSync();
});
