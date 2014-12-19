// This is shared gulptasks for all example projects
// To do Sauce Lab tests
var gulp = require(process.cwd() + '/node_modules/gulp'),
    nodemon = require(process.cwd() + '/node_modules/nodemon'),
    shell = require(process.cwd() + '/node_modules/gulp-shell');

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

gulp.task('test_run_protractor', shell.task('protractor testconf.js', {
    ignoreErrors: true
}));

gulp.task('test_end_protractor', ['test_run_protractor'], function () {
    nodemon.emit('quit');
    process.exit();
});