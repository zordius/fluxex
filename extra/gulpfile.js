var gulp = require('gulp');
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');
var cached = require('gulp-cached');
var coverage = require('gulp-jsx-coverage');
var fs = require('fs');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var aliasify = require('aliasify');
var babelify = require('babelify');
var browserify = require('browserify');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var nodemon = require('nodemon');
var browserSync = require('browser-sync');
var serverStarted = false;
var packageJSON = require(process.cwd() + '/package.json');
var TPU = require('tcp-port-used');

// These configs will be exported and you can overrides them
var configs = {
    port: 3000,
    BSport: 3001,

    // files to eslint
    lint_files: ['actions/*.js', 'stores/*.js', 'components/*.jsx', 'fluxexapp.js'],

    // All js/css files will be writen here
    static_dir: 'static/',

    // Major script to start your express server and mount fluxex application
    mainjs: packageJSON.main,

    // Your fluxex application defination
    appjs: process.cwd() + '/fluxexapp.js',

    // fail the gulp task when eslint issues found
    // edit your .eslintrc to refine your eslint settings
    eslint_fail: false,

    // If you use vim and watch tasks be triggered 2 times when saving
    // You can prevent this by adding `set nowritebackup` in your ~/.vimrc
    // Reference: https://github.com/joyent/node/issues/3172
    // https://github.com/paulmillr/chokidar/issues/35
    gulp_watch: {debounceDelay: 500},

    // watchify config
    // refer to https://github.com/substack/watchify
    watchify: {debug: true, delay: 500},

    // uglify config
    // refer to https://github.com/mishoo/UglifyJS2
    uglify: undefined,

    // list of modules to be bundled into devcore.js to save js loading time when develop
    devcore: [
        'react',
        'react-dom',
        'fluxex',
        'browser-request',
        'babel-polyfill',
        'fluxex/extra/commonStores',
        'fluxex/extra/routing',
        'fluxex/extra/rpc',
        'fluxex/extra/rpc-seturl',
        'babel-runtime/core-js/promise'
    ],

    // babelify config
    // refer to https://github.com/babel/babelify
    babelify: {
        // Note: for babelify this is regex, but for babel this is glob
        ignore: /node_modules/
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
                presets: ['es2015', 'react'],
                sourceMap: 'both'
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
};

var restartNodemon = function () {
    nodemon.emit('restart');
};

var buildLintTask = function (src) {
    var task = gulp.src(src).pipe(cached('eslint')).pipe(eslint()).pipe(eslint.formatEach());

    if (configs.github) {
        task = task.pipe(require('gulp-github')(configs.github));
    }

    if (configs.eshint_fail) {
        task = task.pipe(('object' === typeof configs.eslint_fail) ? configs.eslint_fail : eslint.failOnError());
    }

    return task;
};

// Do testing tasks
var getTestingTask = function (options) {
    var cfg = JSON.parse(JSON.stringify(configs.test_coverage.default));

    cfg.istanbul.exclude = configs.test_coverage.default.istanbul.exclude;
    cfg.coverage.reporters = options.coverage.reporters;
    cfg.mocha = options.mocha;
    cfg.cleanup = configs.test_coverage.default.cleanup;

    return coverage.createTask(cfg);
};

var bundleAll = function (b, noSave) {
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
};

var buildApp = function (watch, fullpath, nosave) {
    var b = browserify(configs.appjs, {
        cache: {},
        packageCache: {},
        standalone: 'Fluxex',
        fullPaths: fullpath ? true : false,
        debug: watch
    });

    b.transform(babelify.configure(configs.babelify));

    b.transform(aliasify.configure(Object.assign(require('../package.json').aliasify, packageJSON.aliasify)), {global: true});

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

gulp.task('check_devcore', function () {
    if (!fs.existsSync(configs.static_dir + 'js/devcore.js')) {
        gulp.start(['build_devcore']);
    }
});

gulp.task('build_devcore', function () {
    var b = browserify(undefined, {debug: true});
    b.require(configs.devcore);
    b.transform(babelify.configure(configs.babelify));
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
    return buildLintTask(configs.lint_files);
});

// GULP TASK - watch main and app js to lint then restart nodemon
gulp.task('watch_server', ['lint_server'], function () {
    gulp.watch([configs.mainjs, configs.appjs], configs.gulp_watch, ['lint_server'])
    .on('change', function (E) {
        if (E.path !== configs.appjs) {
            restartNodemon();
        }
    });
});

// GULP TASK - lint main and app js files
gulp.task('lint_server', function () {
    return buildLintTask([configs.mainjs, configs.appjs]);
});

// GULP TASK - start nodemon server and browserSync proxy
gulp.task('nodemon_server', ['check_devcore', 'watch_js', 'watch_app', 'watch_server'], function () {
    var F = __dirname + '/nodemon.json';
    var nodemonCfg = {
        ignore: '*',
        script: configs.mainjs,
        ext: 'do_not_watch'
    };
    if (fs.existsSync(F)) {
        nodemonCfg = Object.assign(require(F), nodemonCfg);
    }
    nodemon(nodemonCfg)
    .on('log', function (log) {
        gutil.log(log.colour);
    })
    .on('start', function () {
        if (serverStarted) {
            TPU.waitUntilUsed(configs.port, 200, 30000).then(browserSync.reload);
        } else {
            browserSync.init(null, {
                proxy: 'http://localhost:' + configs.port,
                files: [configs.static_dir + 'css/*.css'],
                port: configs.BSport,
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
