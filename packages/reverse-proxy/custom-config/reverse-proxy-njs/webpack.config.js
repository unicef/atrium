const path = require('path');

module.exports = {
  mode: 'production',
  entry: './auth.js',
  output: {
    path: path.resolve('dist'),
    filename: 'main.js',
  },
  optimization: {
    minimize: false,
  },
  node: {
    global: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$$/,
        exclude: /(bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
      util: require.resolve('util/'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
    },
  },
  devtool: 'source-map',
};
