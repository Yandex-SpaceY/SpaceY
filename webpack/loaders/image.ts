const imageRegex = /\.(svg|png|jpg|gif)$/;

export default {
  client: {
    test: imageRegex,
    use: ['file-loader?name=./images/[name].[ext]'],
  },
  server: {
    test: imageRegex,
    loader: 'null-loader',
  }
};
