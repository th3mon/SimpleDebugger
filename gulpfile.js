const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins();
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;

gulp.task('build', ['lint'], () =>
  gulp.src('./src/*.js')
    .pipe(plugins.sourcemaps.init())
    .pipe(uglify())
    .pipe(plugins.concat('simple-debugger.min.js'))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('./dist'))
);

gulp.task('browser-sync', () =>
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
);

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**', '!dist/**'])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
});

gulp.task('serve', ['browser-sync', 'lint'], () => {
  gulp.watch('./src/*', ['build'])
    .on('change', browserSync.reload);
});
