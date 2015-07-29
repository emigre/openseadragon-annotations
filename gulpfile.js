'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ pattern: ['gulp-*', 'vinyl-*',
    'del', 'browserify', 'babelify', 'karma', 'run-sequence' ] });

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
    }, cb).start();
});

gulp.task('scripts', ['clean'], function () {
    return $.browserify({ entries: ['./src/openseadragon-annotations.js'] })
        .transform($.babelify)
        .bundle()
        .pipe($.vinylSourceStream('openseadragon-annotations.js'))
        .pipe($.vinylBuffer())
        .pipe($.sourcemaps.init({ loadMaps: true }))
        .pipe($.uglify())
        .pipe($.rename({ extname: '.min.js' }))
        .pipe($.sourcemaps.write('/'))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', ['clean'], function () {
    return gulp.src('img/**/*.*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['clean', 'lint', 'test', 'scripts', 'images']);

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['clean', 'test', 'scripts' ]);
});

gulp.task('serve', function () {
    $.runSequence(['clean', 'test', 'scripts', 'images'], 'watch');
});

gulp.task('default', ['serve']);
