var gulp = require('gulp');






/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify('Building Jekyll');
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        host: "localhost"
    });
});

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('src/scss/**/*.scss', ['css']);
  // Watch .js files
  gulp.watch('src/js/**/*.js', ['js']);
  // Watch .html files and posts
  gulp.watch(['index.html', '_includes/*.html', '_layouts/*.html', '*.md', '_posts/*'], ['jekyll-rebuild']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('css', 'js', 'browser-sync', 'watch');
});