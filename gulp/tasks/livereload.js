var gulp       = require('gulp'),
		livereload = require('gulp-livereload');

gulp.task('livereload', function() {
  livereload.listen();
});
