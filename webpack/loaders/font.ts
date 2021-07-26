const fontRegex = /\.(woff|woff2|ttf|otf|eot)$/;

export default {
  client: {
    test: fontRegex,
    use: ['file-loader?name=./fonts/[name].[ext]'],
  },
  server: {
    test: fontRegex,
    loader: 'null-loader'
  }
};
