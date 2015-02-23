var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var watch = require('gulp-watch');

gulp.task('default', ['browserify']);

gulp.task('browserify', function(){
  return browserify('./src/jsx/app.jsx')
    .transform(reactify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/js/'))
});

gulp.task('watch', function(){
  watch(['./src/**/*.js', './src/**/*.jsx'], function(){
    gulp.start('browserify');
  })
})