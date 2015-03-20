'use strict';

var gulp = require('gulp'),
    exec = require('gulp-exec'),
    testCommands = 'cd <%=file.path %>;npm install https://github.com/zordius/fluxex/tarball/' + process.env.ORIGIN_COMMIT + ';npm prune;npm install;npm run-script disc;npm test';

gulp.task('example_tests', function () {
    return gulp.src('*-*/')
    .pipe(exec(testCommands))
    .pipe(exec.reporter());
});
