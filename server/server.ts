import path from 'path';
import express, { Response } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';

import { sequelize } from './sequelize/models';
import apiRoutes from './sequelize/routes';
import { serverRenderer, hotReload } from './middlewares';
import { DIST_DIR, IS_DEV, SRC_DIR } from '../webpack/constants';
import { HOST_URL } from 'constants/commonConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';

const routes = Object.values(ROUTE_CONSTANTS);
const { PORT = 3000 } = process.env;
const app = express();

const checkPage = (url: string) => (routes.some(route => url.includes(route) && route !== '/')) || url === '/';
const sequelizeSync = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Connection has been established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

app
  .use((req, res, next) => {
    if (checkPage(req.url)) {
      res.locals.cspNonce = Buffer.from(uuidv4()).toString('base64');
    }

    next();
  })
  .use((req, res, next) => {
    let middleware;

    if (checkPage(req.url)) {
      middleware
        = helmet({
          contentSecurityPolicy: {
            useDefaults: true,
            directives: {
              scriptSrc: [ '\'self\'', (req, res) => `'nonce-${(<Response>res).locals.cspNonce}'`, IS_DEV ? '\'unsafe-eval\'' : '' ],
              connectSrc: [ '\'self\'', `${HOST_URL}` ],
              imgSrc: [ '\'self\'', `${HOST_URL}` ],
            },
          }
        });
    }

    middleware && middleware(req, res, next);
    next();
  })
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
