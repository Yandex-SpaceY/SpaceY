/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

const filename = ext => (production ? `bundle.[fullhash].${ext}` : `bundle.${ext}`);

module.exports = {
  mode: production ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: filename('js')
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.scss' ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.s[ac]ss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  },
  devtool: production ? false : 'source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ESLintPlugin({
      extensions: [ 'js', 'jsx', 'ts', 'tsx' ]
    }),
    new CleanWebpackPlugin()
  ]
};
