/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './server.js',
  target: 'node',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'server.js',
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
};
