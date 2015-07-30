'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ pattern: ['gulp-*', 'vinyl-*',
    'del', 'lazypipe', 'browserify', 'babelify', 'karma'] });

var watch = false;

gulp.task('clean', function (cb) {
    $.del(['dist/'], cb);
});

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js', '!node_modules/**', '!bower_components/**'])
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError());
});

gulp.task('test', function (cb) {
    new $.karma.Server({
        configFile: __dirname + '/karma.conf.js',
        reporters: ['dots'],
        singleRun: true
    }, cb).start();
});

var minify = $.lazypipe()
    .pipe($.sourcemaps.init, { loadMaps: true })
    .pipe($.uglify)
    .pipe($.rename, { extname: '.min.js' })
    .pipe($.sourcemaps.write, '/');

gulp.task('scripts', ['clean'], function () {
    return $.browserify({ entries: ['./src/openseadragon-annotations.js'] })
        .transform($.babelify)
        .bundle()
        .pipe($.vinylSourceStream('openseadragon-annotations.js'))
        .pipe($.vinylBuffer())
        .pipe(gulp.dest('dist'))
        .pipe($.if(!watch, minify()))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', ['clean'], function () {
    return gulp.src('img/**/*.*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['clean', 'scripts', 'images']);

gulp.task('watch', ['build'], function () {
    watch = true;
    gulp.watch('src/**/*.js', ['clean', 'scripts']);
});

gulp.task('default', ['watch']);
