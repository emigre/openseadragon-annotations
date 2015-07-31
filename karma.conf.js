'use strict';

module.exports = function (config) {

    config.set({

        frameworks: ['browserify', 'mocha', 'chai-as-promised', 'chai', 'sinon'],

        files: [
            'bower_components/openseadragon/built-openseadragon/openseadragon/openseadragon.js',
            { pattern: 'src/**/*.js', watched: false, included: false, served: true},
            { pattern: 'test/**/*.js', watched: false, included: true, served: true}
        ],

        preprocessors: {
            'test/**/*.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: ['babelify']
        },

        basePath: '.',

        reporters: ['mocha'],

        autoWatch: true,

        browsers: ['PhantomJS'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        singleRun: false

    });

};
