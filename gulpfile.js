var gulp   = require('gulp');
var Server = require('karma').Server;
var bump   = require('gulp-bump');
var argv  = require('yargs').argv;
var gulpif = require('gulp-if');

gulp.task('test', (done) => {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun:true
  }, done).start();
});

// version format: _._._
gulp.task('bump', () => {
  gulp.src(['./config.xml', './package.json'])
  .pipe(gulpif(argv.patch, bump({type:'patch'}))) // _._.X
  .pipe(gulpif(argv.minor, bump({type:'minor'}))) // _.X._
  .pipe(gulpif(argv.major, bump({type:'major'}))) // X._._
  .pipe(gulp.dest('./'));
})