'use strict';

var gulp = require('gulp'),
    shell = require('gulp-shell'),
    testCommands = ['cd <%=file.path %>;npm install ../..;npm prune;cp -R ..//00hello/node_modules node_modules;npm install;npm run-script disc;npm test'];

gulp.task('example_tests', function () {
    return gulp.src('*-*/')
    .pipe(shell(testCommands));
});
