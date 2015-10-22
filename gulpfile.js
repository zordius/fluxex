var gulp = require('gulp'),
    shell = require('gulp-shell'),
    eslint = require('gulp-eslint'),
    testCommands = ['cd <%=file.path %>;npm install ../..;npm prune;npm install;npm run disc;npm test'];

gulp.task('smoke_test', function () {
    return gulp.src('examples/00hello/')
    .pipe(shell(testCommands));
});

gulp.task('example_tests', function () {
    return gulp.src('examples/*-*/')
    .pipe(shell(testCommands));
});

gulp.task('watch_document', ['build_document'], function () {
    return gulp.watch(['README.md', 'index.js', 'lib/*.js', 'extra/*.js'], ['build_document']);
});

gulp.task('build_document', shell.task('jsdoc -p README.md index.js lib/*.js extra/*.js -d documents'));

gulp.task('eslint', function () {
    return gulp.src(['index.js', 'gulpfile.js', 'lib/*.js', 'extra/*.js', 'test/*.js', '!extra/polyfill-ie8-client.js'])
    .pipe(eslint())
    .pipe(eslint.formatEach())
    .pipe(eslint.failOnError());
});

gulp.task('clean', function () {
    return gulp.src('examples/00hello/node_modules', 'examples/*/node_modules')
    .pipe(shell('rm -rf <%=file.path %>'));
});
