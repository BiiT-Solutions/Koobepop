var gulp = require('gulp');
var Server = require('karma').Server;
var bump = require('gulp-bump');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var del = require('del');
var replace = require('gulp-replace')

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
}


// Copy the 'images' folder.
)
gulp.task('move-infographic-js-images',function(){
  del(['src/assets/infographic-images']).then(string=>{
    console.log(string);
  gulp.src('node_modules/infographic-js/images/*')
    .pipe(gulp.dest('src/assets/infographic-images'))
  });
  
});

// Change the configuration of infographic-js 
gulp.task('change-infographic-js-properties',function(){
  gulp.src('node_modules/infographic-js/lib/fileManagerProperties.js',{base:'./'})
  .pipe(replace(/=.*images.*/gi,"= 'assets/infographic-images/'"))
  .pipe(gulp.dest('./'))
});