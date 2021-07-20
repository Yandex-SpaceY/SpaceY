import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const scssRegex = /\.s[ac]ss$/;

export default {
  client: {
    test: scssRegex,
    use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ],
  },
  server: {
    test: scssRegex,
    loader: 'null-loader',
  }
};
