var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    nodemon = require('nodemon'),                                                                       
    browserSync = require('browser-sync'),
    react = require('gulp-react'),
    jshint = require('gulp-jshint'),

bundleAll = function (b) {
    b.bundle()
    .on('error', function (E) {
        gutil.log('[browserify ERROR]', gutil.colors.red(E));
    })
    .pipe(source('main.js'))
    .pipe(gulp.dest('static/js/'));
},

start_browserSync = function () {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["static/css/*.css"],
        port: 3001,
        online: false,
        open: false
    });
},

buildJsx = function (watch) {
    var b = browserify(process.cwd() + '/app.js', {
        cache: {},
        packageCache: {},
        fullPaths: watch,
        debug: watch
    });

    b.transform('reactify');

    if (watch) {
        b = watchify(b, {delay: 1000});
        b.on('update', function (F) {
            gutil.log('[browserify] ' + F + ' updated');
            bundleAll(b);
        });
    }

    bundleAll(b);
    return b;
};

gulp.task('build_jsx', function () {
    return buildJsx(false);
});

gulp.task('watch_jsx', function () {
    return buildJsx(true);
});

