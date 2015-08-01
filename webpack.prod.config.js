var webpack = require('webpack');
var extend = require('extend');
var config = require('./webpack.config');

module.exports = extend(true, config, {
    output: {
        filename: "openseadragon-annotations.min.js",
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false,
                semicolons: true
            }
        })
    ]
});
