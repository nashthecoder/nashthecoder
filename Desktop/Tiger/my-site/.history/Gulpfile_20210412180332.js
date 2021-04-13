var gulp = require('gulp');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();

// Task for building blog when something changed:
gulp.task('build', shell.task(['bundle exec jekyll serve']));
// If you don't use bundle:
// gulp.task('build', shell.task(['jekyll serve']));
// If you use  Windows Subsystem for Linux (thanks @SamuliAlajarvela):
// gulp.task('build', shell.task(['bundle exec jekyll serve --force_polling']));

// Task for serving blog with Browsersync

gulp.task('server', gulp.series('build', function(){
    browser.init({server: './_site', port: port});
  }));


