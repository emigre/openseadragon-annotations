'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  debug: true,
  watch: true,
  resolve: {
    extensions: ['', '.jsx', '.js'],
  },
  entry: path.join(__dirname, 'src/main.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'openseadragon-annotations.js',
    libraryTarget: 'var',
    library: ['OpenSeadragon', 'Viewer', 'prototype', 'annotations'],
    pathinfo: true,
  },
  externals: {
    'OpenSeadragon': 'OpenSeadragon',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.png$/, loader: 'url' },
    ],
  },
};
