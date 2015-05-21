var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    cached = require('gulp-cached'),
    coverage = require('gulp-jsx-coverage'),
    fs = require('fs'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    aliasify = require('aliasify'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    nodemon = require('nodemon'),
    browserSync = require('browser-sync'),
    serverStarted = false,
    packageJSON = require(process.cwd() + '/package.json'),

// These configs will be exported and you can overrides them
configs = {
    // files to jshint and jscs
    lint_files: ['actions/*.js', 'stores/*.js', 'components/*.jsx', 'fluxexapp.js'],

    // All js/css files will be writen here
    static_dir: 'static/',

    // Major script to start your express server and mount fluxex application
    mainjs: packageJSON.main,

    // Your fluxex application defination
    appjs: process.cwd() + '/fluxexapp.js',

    // wait time after your bundle writen then trigger nodemon restart
    nodemon_restart_delay: 200,

    // wait time after your server start then trigger browserSync reload
    nodemon_delay: 2000,

    // fail the gulp task when jshint issue found
    // edit your .jshintrc | .jshintignore to refine your jshint settings
    jshint_fail: false,

    // fail the gulp task when jscs issue found
    // edit your .jscsrc to refine your jshint settings
    jscs_fail: false,

    // If you use vim and watch tasks be triggered 2 times when saving
    // You can prevent this by adding `set nowritebackup` in your ~/.vimrc
    // Reference: https://github.com/joyent/node/issues/3172
    // https://github.com/paulmillr/chokidar/issues/35
    gulp_watch: {debounceDelay: 500},

    // watchify config
    // refer to https://github.com/substack/watchify
    watchify: {debug: true, delay: 500},

    // aliasify config
    // refer to https://github.com/benbria/aliasify
    // Deprecated and will be removed, please put your aliasify config into your package.json
    aliasify: Object.assign(require('../package.json').aliasify, packageJSON.aliasify),

    // uglify config
    // refer to https://github.com/mishoo/UglifyJS2
    uglify: undefined,

    // list of modules to be bundled into devcore.js to save js loading time when develop
    devcore: ['react', 'fluxex', 'babelify/polyfill', 'browser-request'],

    // babel config
    // refer to http://babeljs.io/docs/usage/options/
    babel: {
        optional: ['runtime']
    },

    // babelify config, will be merged with babel config
    // refer to https://github.com/babel/babelify
    babelify: {
        // Note: for babelify this is regex, but for babel this is glob
        ignore: /node_modules/,
        extensions: ['.js', '.jsx']
    },

    // tests + coverage configs
    test_coverage: {
        // gulp-jsx-coverage config
        // refer to https://github.com/zordius/gulp-jsx-coverage
        default: {
            src: ['test/**/*.js', 'test/components/*.jsx', 'test/components/*.js'],
            istanbul: {
                coverageVariable: '__FLUXEX_COVERAGE__',
                exclude: /node_modules\/|test\//
            },
            coverage: {
                directory: 'coverage'
            },
            mocha: {},
            babel: {
                sourceMap: 'inline'
            },
            coffee: {
                sourceMap: true
            }
        },

        // for manual testing
        console: {
            coverage: {
                reporters: ['text-summary']
            },
            mocha: {
                reporter: 'spec'
            }
        },

        // for CI testing (save reports to files)
        report: {
            coverage: {
                reporters: ['lcov', 'json']
            },
            mocha: {
                reporter: 'mocha-jenkins-reporter'
            }
        }
    }
},

restartNodemon = function () {
    setTimeout(function () {
        nodemon.emit('restart');
    }, configs.nodemon_restart_delay);
},

buildLintTask = function (task) {
    if (configs.github) {
        task = task.pipe(require('gulp-github')(configs.github));
    }

    if (configs.jshint_fail) {
        task = task.pipe(('object' === typeof configs.jshint_fail) ? configs.jshint_fail : jshint.reporter('fail'));
    }

    return task;
},

// Do testing tasks
getTestingTask = function (options) {
    var cfg = JSON.parse(JSON.stringify(configs.test_coverage.default));

    cfg.istanbul.exclude = configs.test_coverage.default.istanbul.exclude;
    cfg.coverage.reporters = options.coverage.reporters;
    cfg.mocha = options.mocha;
    cfg.cleanup = configs.test_coverage.default.cleanup;

    return coverage.createTask(cfg);
},

handleJSCSError = function (E) {
    if (!configs.jscs_fail) {
        return;
    }

    if ('function' === typeof configs.jscs_fail) {
        return configs.jscs_fail(E);
    }

    this.emit('error', E);
},

bundleAll = function (b, noSave) {
    var B = b.bundle()
    .on('error', function (E) {
        gutil.log('[browserify ERROR]', gutil.colors.red(E));
    });

    if (!noSave) {
        B.pipe(source('main.js'))
        .pipe(gulp.dest(configs.static_dir + 'js/'))
        .on('end', restartNodemon);
    }

    return B;
},

buildApp = function (watch, fullpath, nosave) {
    var b = browserify(configs.appjs, {
        cache: {},
        packageCache: {},
        standalone: 'Fluxex',
        fullPaths: fullpath ? true : false,
        debug: watch
    });

    b.transform(babelify.configure(Object.assign({}, configs.babel, configs.babelify)), {global: true});
    b.transform(aliasify.configure(configs.aliasify), {global: true});

    if ('production' !== process.env.NODE_ENV) {
        b.external(configs.devcore);
    }

    if (watch) {
        b = require('watchify')(b, configs.watchify);
        b.on('update', function (F) {
            gutil.log('[browserify] ' + F[0] + ' updated');
            bundleAll(b);
        });
    }

    return bundleAll(b, nosave);
};

gulp.task('build_devcore', function () {
    var b = browserify(configs.devcore, {debug: true});

    b.transform(babelify.configure(Object.assign({}, configs.babel, configs.babelify)), {global: true});
    return b
    .bundle()
    .pipe(source('devcore.js'))
    .pipe(gulp.dest(configs.static_dir + 'js/'));
});

// GULP TASK - build minified bundle file
gulp.task('build_app', function () {
    process.env.NODE_ENV = 'production';
    return buildApp(false, false, true)
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(uglify(configs.uglify))
        .pipe(gulp.dest(configs.static_dir + 'js/'));
});

// GULP TASK - create disc analyze report file
gulp.task('disc_app', function () {
    return buildApp(false, true, true)
        .pipe(require('disc')())
        .pipe(fs.createWriteStream(configs.static_dir + 'disc.html'));
});

// GULP TASK - watch and build bundle file for develop
gulp.task('watch_app', function () {
    return buildApp(true, true);
});

// GULP TASK - watch and lint js files for develop
gulp.task('watch_js', ['lint_js'], function () {
    gulp.watch(configs.lint_files, configs.gulp_watch, ['lint_js']);
});

// GULP TASK - lint js files for develop
gulp.task('lint_js', function () {
    return buildLintTask(
        gulp.src(configs.lint_files)
        .pipe(cached('jshint'))
        .pipe(babel(Object.assign({sourceMap: true}, configs.babel)))
        .pipe(jscs()).on('error', handleJSCSError)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
    );
});

// GULP TASK - watch main and app js to lint then restart nodemon
gulp.task('watch_server', ['lint_server'], function () {
    gulp.watch([configs.mainjs, configs.appjs], configs.gulp_watch, ['lint_server'])
    .on('change', function (E) {
        if (E.path !== configs.appjs) {
            nodemon.emit('restart');
        }
    });
});

// GULP TASK - lint main and app js files
gulp.task('lint_server', function () {
    return gulp.src([configs.mainjs, configs.appjs])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// GULP TASK - start nodemon server and browserSync proxy
gulp.task('nodemon_server', ['build_devcore', 'watch_js', 'watch_app', 'watch_server'], function () {
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
                open: false,
                snippetOptions: {
                    rule: {
                        match: /<\/html>$/,
                        fn: function (s, m) {
                            return m + s;
                        }
                    }
                }
            });

            serverStarted = true;
        }
    });
});

// GULP TASK - watch tests files then execute test
gulp.task('watch_tests', ['test_app'], function () {
    gulp.watch([
        configs.test_coverage.default.src,
        configs.lint_files
    ], ['test_app']);
});

// GULP TASK - execute mocha tests, output to console
gulp.task('test_app', function (cb) {
    getTestingTask(configs.test_coverage.console)(cb).on('error', function (E) {
        if (E.stack || E.showStack) {
            console.warn(E.stack);
        } else {
            console.warn(E);
        }
    }).on('end', function () {
        cb(); // prevent failed ending
    });
});

// GULP TASK - execute mocha tests, output to file
gulp.task('save_test_app', function () {
    return getTestingTask(configs.test_coverage.report)();
});

// GULP TASKS - alias and depdency
gulp.task('develop', ['nodemon_server']);
gulp.task('lint_all', ['lint_server', 'lint_js']);
gulp.task('buildall', ['lint_all', 'build_app']);
gulp.task('default',['buildall']);

module.exports = configs;
