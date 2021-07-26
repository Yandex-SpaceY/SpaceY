import path from 'path';

import { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';

import {  ALIAS, DIST_DIR, SERVER_BUNDLE_NAME, SERVER_DIR } from './constants';
import { fontLoader, imageLoader, scssLoader, tsLoader } from './loaders';

const serverConfig: Configuration = {
  name: 'server',
  target: 'node',
  node: { __dirname: false },
  entry: path.join(SERVER_DIR, '/server'),
  module: {
    rules: [
      tsLoader.server,
      scssLoader.server,
      fontLoader.server,
      imageLoader.server,
    ]
  },
  output: {
    filename: `${SERVER_BUNDLE_NAME}.js`,
    path: DIST_DIR,
    publicPath: '/',
  },
  resolve: {
    alias: ALIAS,
    extensions: [ '.ts', '.tsx', '.js' ]
  },
  externals: [nodeExternals()],
};

export default serverConfig;
