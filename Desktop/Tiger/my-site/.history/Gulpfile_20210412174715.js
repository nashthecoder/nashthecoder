var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    critical = require('critical'),
    cp = require('child_process');

gulp.task('css', function() {
  return sass('src/scss/style.scss', { style: 'expanded' })
    .pipe(plumber())
    .pipe(autoprefixer('last 2 version', 'ie 9'))
    .pipe(gulp.dest('css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('js', function() {
  return gulp.src('src/js/scripts.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(gulp.dest('_site/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', function() {
  return gulp.src(['css', 'js'], {read: false})
    .pipe(clean());
});

gulp.task('critical-css', function() {
    critical.generate({
        // Your base directory
        base: '_site/',
        // HTML source file
        src: 'index.html',
        // CSS output file
        dest: 'css/critical.min.css',
        // Viewport width
        width: 1200,
        // Viewport height
        height: 900,
        // Minify critical-path CSS
        minify: true
    });
});

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