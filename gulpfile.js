// Include gulp
var gulp    = require('gulp');

// Include Our Plugins
var browserSync   = require('browser-sync').create();
var browserify    = require('browserify');
var source        = require('vinyl-source-stream');
var buffer        = require('vinyl-buffer');

var jshint  = require('gulp-jshint');
var sass    = require('gulp-sass');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var rename  = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('./app/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile JS
gulp.task('scripts', function() {
    return gulp.src('./app/scripts/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
});

// Compile Node Scripts
gulp.task('browsify', function() {
    return browserify('./dist/js/main.js')
        .bundle()
        .pipe(source('main.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

// Compile Our Sass
gulp.task('styles', function() {
    return gulp.src('./app/styles/base.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

//trow html file
gulp.task('html', function() {
    return gulp.src('./app/index.html')
        .pipe(gulp.dest('./dist'));
});

//trow icons
gulp.task('icon', function() {
    return gulp.src('app/favicon.ico')
      .pipe(gulp.dest('./dist'));
});

// Static Server + watching scss/html files
gulp.task('start', ['lint', 'styles', 'scripts', 'html', 'icon', 'browsify'], function() {
    browserSync.init({
        server: "dist"
    });
    gulp.watch("./app/scripts/*.js", ['scripts', 'browsify']);
    gulp.watch("./app/styles/*.scss", ['styles']);
});
