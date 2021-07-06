/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

const filename = ext => (production ? `bundle.[fullhash].${ext}` : `bundle.${ext}`);

module.exports = {
  mode: production ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: filename('js'),
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.scss' ],
    alias: {
      api: `${__dirname}/src/api`,
      components: `${__dirname}/src/components`,
      constants: `${__dirname}/src/constants`,
      pages: `${__dirname}/src/pages`,
      router: `${__dirname}/src/router`,
      utils: `${__dirname}/src/utils`,
      style: `${__dirname}/src/style`,
      images: `${__dirname}/src/assets/images`,
      store: `${__dirname}/src/store`,
      hooks: `${__dirname}/src/hooks`,
      game: `${__dirname}/src/game`,
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: ['file-loader?name=./images/[name].[ext]'],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: ['file-loader?name=./fonts/[name].[ext]'],
      },
    ]
  },
  devtool: production ? false : 'source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${__dirname}/src/game/assets`,
          to: `${__dirname}/dist/assets`
        }
      ]
    }),
  ]
};
