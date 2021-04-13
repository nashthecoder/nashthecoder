var gulp         = require('gulp');
var browserSync  = require('browser-sync');

gulp.task('default', ['css', 'js', 'browser-sync'], function () {
    gulp.watch("assets/scss/*/*.scss", ['css', 'css-to-site']);
    gulp.watch("assets/js/*.js", ['js', 'js-to-site']);
    gulp.watch(['index.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});
