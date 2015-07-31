'use strict';

module.exports = function (config) {

    config.set({

        frameworks: ['mocha', 'chai-as-promised', 'chai', 'sinon'],

        files: [
            'bower_components/openseadragon/built-openseadragon/openseadragon/openseadragon.js',
            'test/**/*.js'
        ],

        preprocessors: {
            'test/**/*.js': ['webpack', 'sourcemap']
        },

        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.js/,
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    }
                ]
            },
            devtool: 'inline-source-map',
            watch: true
        },

        webpackMiddleware: {
            noInfo: true
        },

        basePath: '.',

        reporters: ['mocha'],

        browsers: ['PhantomJS'],

        autoWatch: true,

        singleRun: false,

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO

    });

};
