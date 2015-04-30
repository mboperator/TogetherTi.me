var 
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  cached = require('gulp-cached'),
  autoprefixer = require('gulp-autoprefixer'),
  minify = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  webpack = require('gulp-webpack'),
  webpackServer = require('./webpack-server');

gulp.task('webpack-hot', webpackServer); 

gulp.task('webpack', function() {
  return gulp.src('./lib/js/app.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('public/assets/js'));
});

gulp.task('styles', function() {
  return gulp.src(['./lib/css/*.scss'])
    .pipe(sass())
    .pipe(autoprefixer({ browsers: ['last 2 version'] }) )
    .pipe(gulp.dest('./public/assets/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./public/assets/css/'));
});

gulp.task('watch', function() {
  gulp.watch('./lib/js/**/*.js', ['webpack']);
  gulp.watch('./lib/css/*.scss', ['styles']);
  gulp.watch('./public/*.html', notifyLiveReload);
  gulp.watch('./public/assets/css/*.min.css', notifyLiveReload);
  gulp.watch('./public/assets/js/*.js', notifyLiveReload);
});

gulp.task('default', ['styles', 'express', 'webpack', 'livereload', 'watch']);
