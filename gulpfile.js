'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ pattern: ['gulp-*', 'del', 'browserify',
    'babelify', 'karma', 'vinyl-buffer', 'vinyl-source-stream'] });

gulp.task('clean', function (cb) {
    $.del(['dist/'], cb);
});

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js', '!node_modules/**', '!bower_components/**'])
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError());
});

gulp.task('test', ['lint'], function (cb) {
    new $.karma.Server({
        configFile: __dirname + '/karma.conf.js',
        reporters: ['dots'],
        singleRun: true
    }, cb).start();
});

gulp.task('build', ['clean', 'test'], function () {
    var img = gulp.src('img/**/*.*').pipe(gulp.dest('dist/img'));
    var js = $.browserify({
            entries: ['./src/openseadragon-annotations.js'],
            debug: true
        })
        .transform($.babelify)
        .bundle()
        .pipe($.vinylSourceStream('openseadragon-annotations.js'))
        .pipe($.vinylBuffer())
        .pipe($.sourcemaps.init({ loadMaps: true }))
            .pipe($.uglify())
            .pipe($.rename({
                extname: '.min.js'
            }))
        .pipe($.sourcemaps.write('/'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);
