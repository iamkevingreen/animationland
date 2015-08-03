var gulp           = require('gulp');
var browserifyTask = require('./browserify');
var webpackTask = require('./webpack');

gulp.task('watchify', function(callback) {
  // Start browserify task with devMode === true
  browserifyTask(callback, true);
  // webpackTask(callback, true);
});
