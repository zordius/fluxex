var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    nodemon = require('nodemon'),
    browserSync = require('browser-sync'),
    react = require('gulp-react'),
    jshint = require('gulp-jshint'),

configs = {
    jshint_jsx: {quotmark: false}
},

build_files = {
    js: ['actions/*.js', 'stores/*.js'],
    jsx: ['components/*.jsx']
},

bundleAll = function (b) {
    return b.bundle()
    .on('error', function (E) {
        gutil.log('[browserify ERROR]', gutil.colors.red(E));
    })
    .pipe(source('main.js'))
    .pipe(gulp.dest('static/js/'))
    .on('end', function () {
//(browserSync.reload({stream: true, once: true}));
console.log('bundle done!');
console.log(arguments);
    });
},

buildApp = function (watch) {
    var b = browserify(process.cwd() + '/app.js', {
        cache: {},
        packageCache: {},
        require: './components/Html.jsx',
        standalone: 'Fluxex',
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

    return bundleAll(b);
};

gulp.task('build_app', function () {
    return buildApp(false);
});

gulp.task('watch_app', function () {
    return buildApp(true);
});

gulp.task('watch_flux_js', ['lint_flux_js'], function () {
    gulp.watch(build_files.js, ['lint_flux_js']);
});

gulp.task('lint_flux_js', function () {
    return gulp.src(build_files.js)
    .pipe(jshint());
});

gulp.task('watch_jsx', ['lint_jsx'], function () {
    gulp.watch(build_files.jsx, ['lint_jsx']);
});

gulp.task('lint_jsx', function () {
    return gulp.src(build_files.jsx)
    .pipe(react())
    .pipe(jshint(configs.jshint_jsx))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('nodemon_server', ['watch_flux_js', 'watch_jsx', 'watch_app'], function() {
    nodemon({
        ignore: '*',
        script: require(process.cwd() + '/package.json').main,
        ext: 'do_not_watch'
    })
    .on('log', function (log) {
        gutil.log(log.colour);
    })
    .on('start', function () {
        browserSync.init(null, {
            proxy: 'http://localhost:3000',
            files: ['static/css/*.css'],
            port: 3001,
            online: false,
            open: false
        });
    });
});

gulp.task('develop', ['nodemon_server']);
gulp.task('buildall', ['lint_flux_js', 'lint_jsx', 'build_app']);
gulp.task('default',['buildall']);
