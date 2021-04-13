var gulp = require("gulp");
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// Run multiple tasks
gulp.task('start', gulp.series(js, gulpSass));