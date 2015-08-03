/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   This task is set up to generate multiple separate bundles, from
   different sources, and to use Watchify when run from the default task.

   See browserify.bundleConfigs in gulp/config.js
*/

var browserify   = require('browserify');
var livereload   = require('gulp-livereload');
var watchify     = require('watchify');
var path         = require('path');
var bundleLogger = require('../util/bundleLogger');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');
var config       = require('../config').webpack;
var webpack      = require('gulp-webpack-build');
var _            = require('lodash');
var config_web   = webpack.config.CONFIG_FILENAME;

var webpackTask = function() {
  console.log(config_web);
  return gulp.src(path.join('.', '**', config_web), { base: path.resolve(config.src) })
    .pipe(webpack.init(config.webpackConfig))
      .pipe(webpack.props(config.webpackOptions))
      .pipe(webpack.run())
      .pipe(webpack.format({
          version: false,
          timings: true
      }))
      .pipe(webpack.failAfter({
          errors: true,
          warnings: true
      }))
      .pipe(gulp.dest(config.dest))
      .pipe(livereload());

};

gulp.task('webpack', webpackTask);

// Exporting the task so we can call it directly in our watch task, with the 'devMode' option
module.exports = webpackTask;
