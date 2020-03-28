module.exports = (env, { mode }) => ({
  watch: mode === 'development',
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/../backend/public',
  },
})
