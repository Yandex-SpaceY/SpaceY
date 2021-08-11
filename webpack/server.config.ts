import path from 'path';

import { Configuration, DefinePlugin  } from 'webpack';
import { GitRevisionPlugin } from 'git-revision-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

import {  ALIAS, DIST_DIR, IS_DEV, SERVER_BUNDLE_NAME, SERVER_DIR } from './constants';
import { fontLoader, imageLoader, scssLoader, tsLoader } from './loaders';

const plugins = [];
const gitRevisionPlugin = new GitRevisionPlugin();

if (!IS_DEV) {
  plugins.push(
    gitRevisionPlugin,
    new DefinePlugin({
      COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
    })
  );
}

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
  plugins: plugins.filter(Boolean),
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
