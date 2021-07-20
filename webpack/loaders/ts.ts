const tsRegex = /\.tsx?$/;

export default {
  client: {
    test: tsRegex,
    use: ['ts-loader'],
  },
  server: {
    test: tsRegex,
    use: { loader: 'ts-loader' }
  }
};
