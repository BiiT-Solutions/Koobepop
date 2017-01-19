var gulp = require('gulp');
var Server = require('karma').Server;
var bump = require('gulp-bump');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var gutil = require('gulp-util');

gulp.task('test', (done) => {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, (err) => {
    if (err === 0) {
      done();
    } else {
      done(new gutil.PluginError('karma', {
        message: 'Karma test failed'
      }))
      process.exit(1)
    }
  }).start();
});

// version format: _._._
gulp.task('bump', () => {
  gulp.src(['./config.xml', './package.json'])
    .pipe(gulpif(argv.patch, bump({ type: 'patch' }))) // _._.X
    .pipe(gulpif(argv.minor, bump({ type: 'minor' }))) // _.X._
    .pipe(gulpif(argv.major, bump({ type: 'major' }))) // X._._
    .pipe(gulp.dest('./'));
})