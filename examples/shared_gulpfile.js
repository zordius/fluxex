// This is shared gulptasks for all example projects
// To do Sauce Lab tests
var gulp = require(process.cwd() + '/node_modules/gulp'),
    nodemon = require(process.cwd() + '/node_modules/nodemon'),
    shell = require(process.cwd() + '/node_modules/gulp-shell'),
    testcfg = require('./shared_testconf.js');

gulp.task('test_server', ['buildall'], function () {
    nodemon({
        ignore: '*',
        script: 'server.js',
        ext: 'do_not_watch'
    }).on('start', function () {
        setTimeout(function () {
            gulp.start(['test_end_protractor']);
        }, 1000);
    });
});

gulp.task('test_run_protractor', shell.task(
[
    'protractor ../shared_testconf.js',
    'badge-saucelabs-results ' + testcfg.config.job_basename + ' > badge.json',
    'badge-render badge.json badge.html --png badge.png --scale 0.7 -width 490 -height 60'
],
{
    ignoreErrors: true
}));


gulp.task('test_end_protractor', ['test_run_protractor'], function () {
    nodemon.emit('quit');
    process.exit();
});