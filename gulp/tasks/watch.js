/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp     = require('gulp');
var config   = require('../config');
var watchify = require('./browserify')

gulp.task('watch', ['watchify', 'livereload'], function(callback)
{
  gulp.watch(config.sass.src,   ['sass']);
  gulp.watch(config.sass.partialsrc,  ['sass']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch(config.html.src, ['html']);
  // comment out webpack while doing dev
  // gulp.watch(config.webpack.src, ['webpack']);
  // Watchify will watch and recompile our JS, so no need to gulp.watch it
});
