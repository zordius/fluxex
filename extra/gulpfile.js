var gulp = require('gulp'),
    gutil = require('gulp-util'),
    react = require('gulp-react'),
    jshint = require('gulp-jshint'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    aliasify = require('aliasify'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    nodemon = require('nodemon'),
    browserSync = require('browser-sync'),
    serverStarted = false,

// If you use vim and watch tasks be triggered 2 times when saving
// You can :set nowritebackup in vim to prevent this
// Reference: https://github.com/joyent/node/issues/3172
configs = {
    static_dir: 'static/',
    mainjs: require(process.cwd() + '/package.json').main,
    appjs: process.cwd() + '/fluxexapp.js',
    nodemon_restart_delay: 200,
    nodemon_delay: 2000,
    gulp_watch: {debounceDelay: 500},
    watchify: {debug: true, delay: 500},
    jshint_jsx: {quotmark: false},
    aliasify: {
        aliases: {
            request: 'browser-request'
        }
    }
},

build_files = {
    js: ['actions/*.js', 'stores/*.js'],
    jsx: ['components/*.jsx']
},

restart_nodemon = function () {
    setTimeout(function () {
        nodemon.emit('restart');
    }, configs.nodemon_restart_delay);
},

bundleAll = function (b, noSave) {
    var B = b.bundle()
    .on('error', function (E) {
        gutil.log('[browserify ERROR]', gutil.colors.red(E));
    });

    if (!noSave) {
        B.pipe(source('main.js'))
        .pipe(gulp.dest(configs.static_dir + 'js/'))
        .on('end', restart_nodemon);
    }

    return B;
},

buildApp = function (watch, fullpath, nosave, disc) {
    var b = browserify(configs.appjs, {
        cache: {},
        packageCache: {},
        require: (disc ? process.cwd() : '.') + '/components/Html.jsx',
        standalone: 'Fluxex',
        fullPaths: fullpath ? true: false,
        debug: watch
    });

    b.transform('reactify');
    b.transform(aliasify.configure(configs.aliasify), {global: true});

    if (watch) {
        b = require('watchify')(b, configs.watchify);
        b.on('update', function (F) {
            gutil.log('[browserify] ' + F[0] + ' updated');
            bundleAll(b);
        });
    }

    return bundleAll(b, nosave);
};


gulp.task('build_app', function () {
    return buildApp(false, false, true)
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(configs.static_dir + 'js/'));
});

gulp.task('disc_app', function () {
    return buildApp(false, true, true, true)
        .pipe(require('disc')())
        .pipe(require('fs').createWriteStream(configs.static_dir + 'disc.html'));
});

gulp.task('watch_app', function () {
    return buildApp(true, true);
});

gulp.task('watch_flux_js', ['lint_flux_js'], function () {
    gulp.watch(build_files.js, configs.gulp_watch, ['lint_flux_js']);
});

gulp.task('lint_flux_js', function () {
    return gulp.src(build_files.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch_jsx', ['lint_jsx'], function () {
    gulp.watch(build_files.jsx, configs.gulp_watch, ['lint_jsx']);
});

gulp.task('lint_jsx', function () {
    return gulp.src(build_files.jsx)
    .pipe(react())
    .on('error', function (E) {
        gutil.log('[jsx ERROR]', gutil.colors.red(E.fileName));
        gutil.log('[jsx ERROR]', gutil.colors.red(E.message));
    })
    .pipe(jshint(configs.jshint_jsx))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch_server', ['lint_server'], function () {
    gulp.watch(configs.mainjs, configs.gulp_watch, ['lint_server'])
    .on('change', function () {
        nodemon.emit('restart');
    });
});

gulp.task('lint_server', function () {
    return gulp.src(configs.mainjs)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('nodemon_server', ['watch_flux_js', 'watch_jsx', 'watch_app', 'watch_server'], function () {
    nodemon({
        ignore: '*',
        script: configs.mainjs,
        ext: 'do_not_watch'
    })
    .on('log', function (log) {
        gutil.log(log.colour);
    })
    .on('start', function () {
        if (serverStarted) {
            setTimeout(browserSync.reload, configs.nodemon_delay);
        } else {
            browserSync.init(null, {
                proxy: 'http://localhost:3000',
                files: [configs.static_dir + 'css/*.css'],
                port: 3001,
                online: false,
                open: false
            });

            serverStarted = true;
        }
    });
});

gulp.task('test_app', function (cb) {
    var istanbul = require('gulp-istanbul'),
        jsx = require('gulp-jsxtransform'),
        mocha = require('gulp-mocha');

    gulp.src(build_files.jsx.concat(build_files.js))
    .pipe(jsx())
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
        return gulp.src(['test/*.js', 'test/components/*.js*'])
        .pipe(jsx())
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .on('end', cb);
    });
});

gulp.task('develop', ['nodemon_server']);
gulp.task('lint_all', ['lint_server', 'lint_flux_js', 'lint_jsx']);
gulp.task('buildall', ['lint_all', 'build_app']);
gulp.task('default',['buildall']);
