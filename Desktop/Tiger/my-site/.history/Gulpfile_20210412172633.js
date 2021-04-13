// var gulp = require('gulp');
// var shell = require('gulp-shell');
// var browserSync = require('browser-sync').create();

// gulp.task('build', shell.task(['jekyll build --watch']));

// gulp.task('serve', function () {
//     browserSync.init({server: {baseDir: '_site/'}});

//     gulp.watch('_site/**/*.*').on('change', browserSync.reload);
// });

// gulp.task('default', ['build', 'serve']); 


var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    gulpPhpunit = require('gulp-phpunit');

gulp.task('gulpPhpunit', function (done) {
    // var options = {debug: false};
    gulp.src('phpunit.xml')
        .pipe(phpunit('./vendor/bin/phpunit', options));

    done();
});

gulp.task("default", gulp.series('gulpPhpunit'));