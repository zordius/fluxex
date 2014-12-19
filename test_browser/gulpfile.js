var gulp = require('gulp'),
    nodemon = require('nodemon'),
    shell = require('gulp-shell');

require('fluxex/extra/gulpfile');

gulp.task('test_server', ['buildall'], function () {
    nodemon({
        ignore: '*',
        script: 'server.js',
        ext: 'do_not_watch'
    }).on('start', function () {
        setTimeout(function () {
            gulp.start(['end_process']);
        }, 1000);
    });
});

gulp.task('test_run_protractor', shell.task('protractor testconf.js', {
    ignoreErrors: true
}));

gulp.task('test_end_protractor', ['test_run_protractor'], function () {
    nodemon.emit('quit');
});

gulp.task('collect_badge_info', ['test_end_protractor'], shell.task('badge-saucelabs-results > badge.json'));

gulp.task('gen_badge', ['collect_badge_info'], shell.task('badge-render badge.json badge.html --png ../badge.png --scale 0.7 -width 420 -height 60'));

gulp.task('end_process', ['gen_badge'], function () {
    process.exit();
});
