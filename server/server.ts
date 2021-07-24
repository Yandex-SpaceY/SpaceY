import path from 'path';
import express/*, { RequestHandler }*/ from 'express';
import compression from 'compression';

import { DIST_DIR, IS_DEV, SRC_DIR } from '../webpack/constants';
import { serverRenderer, hotReload } from './middlewares';

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(compression());
app.use(express.static(path.resolve(DIST_DIR)));

if (IS_DEV) {
  app.get('/sw.js', (req, res) => {
    res.sendFile(path.join(SRC_DIR, 'sw.js'));
  });
  app.get('/*', [...hotReload()]);
}

app.get('/*', serverRenderer);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
