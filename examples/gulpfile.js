var gulp = require('gulp');
var exec = require('gulp-exec');
var testCommands = 'cd <%=file.path %>;npm prune;npm install;npm install https://github.com/zordius/fluxex/tarball/' + process.env.ORIGIN_COMMIT + ';npm run-script disc;npm test';

gulp.task('example_tests', function () {
    return gulp.src('*-*/')
    .pipe(exec(testCommands))
    .pipe(exec.reporter());
});
