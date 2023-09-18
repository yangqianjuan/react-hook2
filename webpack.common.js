module.exports = {
  output: {
    libraryTarget: 'umd',
  },
  mode: 'production',
  resolve: {
    extensions: ['.js', '.json'],
  },
  externals: [{ react: 'React' }],
};
