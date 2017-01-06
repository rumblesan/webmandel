/* global */

var webpack = require('webpack');

module.exports = {
  entry: './src/main.jsx',
  output: {
    path: './dist',
    filename: './app.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.html$/,
        loader: 'file',
        query: {
          name: '[name].[ext]'
        }
      },
      { test: /\.(png|jpg|svg|ico)$/, loader: 'file?name=[name].[ext]' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.html', 'png', 'jpg', 'svg', 'ico']
  }
};
