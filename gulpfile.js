const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins();

gulp.task('build', () =>
  gulp.src('./src/*.js')
    .pipe(plugins.uglify())
    .pipe(plugins.concat('simple-debugger.min.js'))
    .pipe(gulp.dest('./dist'))
);
