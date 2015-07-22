'use strict';

module.exports = function (config) {

    config.set({

        frameworks: ['mocha', 'chai-as-promised', 'chai', 'sinon'],

        files: [
            'bower_components/openseadragon/built-openseadragon/openseadragon/openseadragon.js',
            'src/openseadragon-annotations.js',
            'test/**/*.js',
            'karma.main.js'
        ],

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