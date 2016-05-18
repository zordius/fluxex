// This is shared gulptasks for all example projects
// To do Sauce Lab tests
var gulp = require(process.cwd() + '/node_modules/gulp');
var testcfg = require('./shared_testconf.js');
var exec = require('child_process').exec;
var TPU = require(process.cwd() + '/node_modules/tcp-port-used');
var child = require('child_process');
var spawn;

var handleExec = function (cb) {
    return function (err, stdout, stderr) {
        console.log(stdout);
        console.warn(stderr);
        cb();
    };
};

var execTask = function (cmd) {
    return function (cb) {
        exec(cmd, handleExec(cb));
    };
};

var spawnTask = function (cmd) {
    return function () {
        var args = cmd.split(' ');
        var C = args.shift();
        spawn = child.spawn(C, args, {stdio: 'inherit'});

        spawn.on('error', function (E) {
            console.warn(E);
        });
    }
};

gulp.task('test_server', ['buildall'], function () {
    spawn = child.spawn('node', ['server.js'], {stdio: 'inherit'});
    spawn.on('error', function (E) {
        console.warn(E);
    });

    TPU.waitUntilUsed((process.env.TESTPORT || 3000) * 1, 200, 30000).then(function () {
        gulp.start(['test_end_protractor']);
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

gulp.task('test_end_protractor', ['generate_badge_png'], function () {
    spawn.kill();
    process.exit();
});
