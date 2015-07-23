var browserify = require('broccoli-browserify');
var copy = require('broccoli-static-compiler');
var merge = require('broccoli-merge-trees');
var esTranspiler = require('broccoli-babel-transpiler');

var img = copy('img', {
  srcDir: '/',
  files: ['*.png'],
  destDir: '/img'
});

var js = esTranspiler('src');

js = browserify(js, {
  entries: ['./openseadragon-annotations.js'],
  outputFile: 'openseadragon-annotations.js'
});

module.exports = merge([ img, js ]);
