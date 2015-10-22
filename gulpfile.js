// Gulp Dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');
var hbsfy = require("hbsfy");

// Build Dependencies
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

// Style Dependencies
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');

// Development Dependencies
var jshint = require('gulp-jshint');

// Test Dependencies
var mochaPhantomjs = require('gulp-mocha-phantomjs');

hbsfy.configure({
  'extensions': ['hbs'],
  'precompilerOptions': {
    'knownHelpersOnly': false
  }
});

//validate
gulp.task('lint-client', function() {
  return gulp.src('./app/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
gulp.task('lint-test', function() {
  return gulp.src('./test/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
//validate


//Start App
gulp.task('browserify-client', ['lint-client'], function() {
  return gulp.src('./app/scripts/*.js')
    .pipe(browserify({
      insertGlobals: true,
      transform: ['hbsfy']
    }))
    .pipe(rename('main.js'))
    .pipe(gulp.dest('./dist/js'));
});
gulp.task('browserify-test', ['lint-test'], function() {
  return gulp.src('./test/scripts/*-test.js')
    .pipe(browserify({
      insertGlobals: true,
      transform: ['hbsfy']
    }))
    .pipe(rename('main.test.js'))
    .pipe(gulp.dest('./dist/js'));
});
gulp.task('watch', ['browserify-client', 'browserify-test']);
//Start App


//start Testing
gulp.task('test', ['lint-test', 'browserify-test'], function() {
  return gulp.src('./test/index-test.html')
    .pipe(mochaPhantomjs())
    .pipe(gulp.dest('./dist'));
});
//start Testing


//start Assets
gulp.task('minify', function() {
  return gulp.src('./app/styles/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('./dist/css'));
});
gulp.task('uglify', ['browserify-client'], function() {
  return gulp.src('./dist/js/main.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('./dist/js'));
});
gulp.task('html', function() {
  return gulp.src('./app/index.html')
    .pipe(gulp.dest('./dist'));
});
gulp.task('icon', function() {
  return gulp.src('app/favicon.ico')
    .pipe(gulp.dest('./dist'));
});
gulp.task('images', function() {
  return gulp.src('app/images/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('./dist/images'));
});
gulp.task('build', ['uglify', 'minify', 'images', 'icon', 'html']);
//start Assets


gulp.task('default', ['build', 'watch'], function() {
  browserSync.init({
    server: "dist"
  });
  gulp.watch(['./app/scripts/*.js', './app/scripts/**/*.js', './app/scripts/template/*.hbs'], ['uglify']);
  gulp.watch(["./app/styles/*.scss", "./app/styles/**/*.scss"], ['minify']);
  gulp.watch(['./test/scripts/*-test.js', './test/scripts/**/*-test.js'], ['browserify-test']);
});
