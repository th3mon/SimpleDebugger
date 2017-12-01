const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins();
const browserSync = require('browser-sync').create();

gulp.task('build', () =>
  gulp.src('./src/*.js')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.uglify())
    .pipe(plugins.concat('simple-debugger.min.js'))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('./dist'))
);

gulp.task('browser-sync', () =>
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
);

gulp.task('serve', () => {
  gulp.run('browser-sync');
  gulp.watch('./src/*', ['build'])
    .on('change', browserSync.reload);
});
