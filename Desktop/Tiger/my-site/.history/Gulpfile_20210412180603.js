var gulp = require("gulp");
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// Specific Task
function js() {
    return gulp
    .src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
}
gulp.task(js);

// Specific Task
function gulpSass() {
    return gulp
    .src(['src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
}
gulp.task(gulpSass);

// Run multiple tasks
gulp.task('start', gulp.series(js, gulpSass));