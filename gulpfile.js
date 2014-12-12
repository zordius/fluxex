'use strict';

var gulp = require('gulp'),
    shell = require('gulp-shell');

gulp.task('build_example', function () {
    return gulp.src('examples/*-*/')
    .pipe(shell(['echo <%=file.path %>']));
});
