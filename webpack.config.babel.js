const path = require('path');
const webpack = require('webpack');

module.exports = (env = {}) => {
  let plugins = [];

  if (env.production) {
    plugins = [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compressor: {
          warnings: false,
          screw_ie8: true,
        },
      }),
    ];
  }

  return {
    devtool: 'source-map',
    resolve: {
      extensions: ['.js'],
    },
    entry: path.join(__dirname, 'src/main.js'),
    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: 'openseadragon-annotations.js',
      library: ['OpenSeadragon', 'Annotations'],
      libraryTarget: 'var',
      libraryExport: 'default',
      pathinfo: true,
    },
    externals: {
      OpenSeadragon: 'OpenSeadragon',
    },
    module: {
      loaders: [
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.png$/, loader: 'url-loader' },
      ],
    },
    plugins,
  };
};
