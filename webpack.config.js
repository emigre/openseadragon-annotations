'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.jsx', '.js'],
  },
  entry: path.join(__dirname, 'src/main.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'openseadragon-annotations.js',
    libraryTarget: 'var',
    library: ['OpenSeadragon', 'Viewer', 'prototype', 'annotations'],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false, screw_ie8: true } }),
  ],
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
