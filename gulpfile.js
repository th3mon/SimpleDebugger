const gulp = require('gulp'),
  gutil = require('gulp-util'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat');

gulp.task('build', function() {
  gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./dist'));
});
