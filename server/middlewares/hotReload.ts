import webpack from 'webpack';
import { RequestHandler } from 'express';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

import config from '../../webpack/client.config';

const compiler = webpack({ ...config, mode: 'development' });

export function hotReload(): RequestHandler[] {

  return [
    devMiddleware(compiler, {
      serverSideRender: true,
      publicPath:
      config.output && config.output.publicPath
        ? String(config.output.publicPath)
        : '/'
    }),
    hotMiddleware(compiler),
  ];
}

export default hotReload;
