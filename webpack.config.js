const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader'
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    port: 8001
  }
}