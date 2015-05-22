// This is shared gulptasks for all example projects
// To do Sauce Lab tests
var gulp = require(process.cwd() + '/node_modules/gulp'),
    nodemon = require(process.cwd() + '/node_modules/nodemon'),
    testcfg = require('./shared_testconf.js');
    exec = require('child_process').exec,

handleExec = function (cb) {
    return function (err, stdout, stderr) {
        console.log(stdout);
        console.warn(stderr);
        cb();
    };
},

execTask = function (cmd) {
    return function (cb) {
        exec(cmd, handleExec(cb));
    }
};

gulp.task('test_server', ['buildall'], function () {
    nodemon({
        ignore: '*',
        script: 'server.js',
        ext: 'do_not_watch'
    }).on('start', function () {
        setTimeout(function () {
            gulp.start(['test_end_protractor']);
        }, 1000);
    }).on('quit', function () {
        console.log('end process...');
        process.exit(0);
    });
});

gulp.task('test_run_protractor', execTask(
    'protractor ../shared_testconf.js'
));

gulp.task('generate_badge_json', ['test_run_protractor'], execTask(
    'badge-saucelabs-results ' + testcfg.config.job_basename + ' > badge.json'
));

gulp.task('generate_badge_png', ['generate_badge_json'], execTask(
    'badge-render badge.json badge.html --png badge.png --scale 0.7 -width 490 -height 60'
));

gulp.task('test_end_protractor', ['generate_badge_png'], function (cb) {
    console.log('stop nodemon....');
    nodemon.emit('quit');
    cb();
});
