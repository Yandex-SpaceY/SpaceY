import path from 'path';

import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { ALIAS, CLIENT_BUNDLE_NAME, DIST_DIR, IS_DEV, SRC_DIR } from './constants';
import { fontLoader, imageLoader, scssLoader, tsLoader } from './loaders';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CssoWebpackPlugin = require('csso-webpack-plugin').default;

const entry: string[] = [path.resolve(SRC_DIR, 'index.tsx')];

if (IS_DEV) {
  entry.push('webpack-hot-middleware/client');
}

const filename = (ext: string): string =>
  (IS_DEV ? `${CLIENT_BUNDLE_NAME}.${ext}` : `${CLIENT_BUNDLE_NAME}.${ext}`);

const clientConfig: Configuration = {
  name: 'client',
  target: 'web',
  entry,
  plugins: [
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new CssoWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${SRC_DIR}/game/assets`,
          to: `${DIST_DIR}/assets`,
        }
      ]
    }),
    IS_DEV && new HotModuleReplacementPlugin(),
  ].filter(Boolean),
  output: {
    path: DIST_DIR,
    filename: filename('js'),
    publicPath: '/',
  },
  devtool: IS_DEV ? 'source-map' : false,
  resolve: {
    alias: ALIAS,
    extensions: [ '.tsx', '.ts', '.js', '.scss' ],
  },
  module: {
    rules: [
      tsLoader.client,
      scssLoader.client,
      fontLoader.client,
      imageLoader.client,
    ]
  }
};

export default clientConfig;
