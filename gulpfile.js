var gulp = require('gulp'),
    shell = require('gulp-shell'),
    eslint = require('gulp-eslint'),
    testCommands = ['cd <%=file.path %>;npm install ../..;npm prune;npm install;npm run disc;npm test'];

gulp.task('example_tests', function () {
    return gulp.src('examples/*-*/')
        .pipe(shell(testCommands));
});

gulp.task('eslint', function () {
    return gulp.src(['index.js', 'gulpfile.js', 'lib/*.js', 'extra/*.js', 'test/*.js', '!extra/polyfill-ie8-client.js'])
        .pipe(eslint())
        .pipe(eslint.formatEach())
        .pipe(eslint.failOnError());
});

gulp.task('clean', function () {
    return gulp.src(['examples/00hello/', 'examples/*-*/'])
        .pipe(shell('rm -rf <%=file.path %>/node_modules <%=file.path %>/static/js'));
});
