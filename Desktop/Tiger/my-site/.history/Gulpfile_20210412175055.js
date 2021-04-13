gulp.task('default', ['css', 'js', 'browser-sync'], function () {
    gulp.watch("assets/scss/*/*.scss", ['css', 'css-to-site']);
    gulp.watch("assets/js/*.js", ['js', 'js-to-site']);
    gulp.watch(['index.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

gulp.task('js-to-site', function () {
  gulp.src('build/js/*')
    .pipe(gulp.dest('html/themes/dental-theme/js'));
    browserSync.reload();
});

gulp.task('css-to-site', function () {
  gulp.src('build/css/*')
    .pipe(gulp.dest('html/themes/dental-theme/css'));
    browserSync.reload();
});