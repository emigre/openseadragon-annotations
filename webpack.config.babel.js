const path = require('path');

const config = {
  entry: './src/main.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'openseadragon-annotations.js',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['', '.jsx', '.js'],
  },
  externals: [
    'openseadragon',
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.png$/, loader: 'url' },
    ],
  },
  devtool: 'source-map',
};

export default config;
