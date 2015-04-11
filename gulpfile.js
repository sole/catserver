'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var yargs = require('yargs');
var path = require('path');
var fs = require('fs');

var appPath = path.join(__dirname, 'build');

gulp.task('lint', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('build', ['build-manifest', 'build-js', 'build-html', 'build-css', 'build-img', 'build-www']);

gulp.task('build-manifest', function() {
  return gulp.src('src/manifest.webapp')
  .pipe(gulp.dest('./build/'));
});

gulp.task('build-js', function() {
  return gulp.src('src/js/app.js')
    .pipe(browserify({
      insertGlobals: false,
      debug: !yargs.argv.production
    }))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('build-html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('./build/'));
});

gulp.task('build-css', function() {
  return gulp.src('src/css/app.css')
    .pipe(gulp.dest('./build/css'));
});

gulp.task('build-img', function() {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('./build/img'));
});

gulp.task('build-www', function() {
  return gulp.src('www/**/*')
    .pipe(gulp.dest('./build/www'));
});

