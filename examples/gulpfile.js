'use strict';

var gulp = require('gulp'),
    shell = require('gulp-shell'),
    testCommands = ['cd <%=file.path %>;npm install https://github.com/zordius/fluxex/tarball/' + process.env.ORIGIN_COMMIT + ';npm prune;npm install;npm run-script disc;npm test'];

gulp.task('example_tests', function () {
    return gulp.src('*-*/')
    .pipe(shell(testCommands));
});
