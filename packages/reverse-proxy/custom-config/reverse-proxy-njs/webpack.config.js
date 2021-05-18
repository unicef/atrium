const path = require('path');

module.exports = {
  mode: 'production',
  entry: './loader.js',
  output: {
    path: path.resolve('dist'),
    filename: 'webpack-compiled-loader.js',
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
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    fallback: {
      buffer: require.resolve('buffer/'),
      util: require.resolve('util/'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
    },
  },
};
