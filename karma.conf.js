module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/test.ts': ['@angular/cli']
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['progress', 'coverage-istanbul']
              : ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers:['PhantomJS'],
    //browsers: ['Chrome'],
    singleRun: false
  });
};
//// Karma configuration
//// Generated on Wed Dec 07 2016 16:27:26 GMT+0100 (CET)
//
//module.exports = function(config) {
//  config.set({
//
//    // base path that will be used to resolve all patterns (eg. files, exclude)
//    basePath: '',
//
//
//    // frameworks to use
//    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
//    frameworks: ['jasmine', 'karma-typescript'],
//
//
//    // list of files / patterns to load in the browser
//    files: [
//      './src/polyfills.ts',
//      './src/mocks.ts',
//      './src/pages/**/*.ts',
//      './src/providers/**/*.ts',
//      './src/models/**/*.ts'
//      
//    ],
//
//    // list of files to exclude
//    exclude: [
//    ],
//
//
//    // preprocess matching files before serving them to the browser
//    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
//    preprocessors: {     
//      './src/polyfills.ts': ['karma-typescript'],            
//      './src/mocks.ts': ['karma-typescript'],
//      './src/pages/**/*.ts': ['karma-typescript'],
//      './src/providers/**/*.ts': ['karma-typescript'],
//      './src/models/**/*.ts': ['karma-typescript']
//    },
//
//    typescriptPreprocessor: {
//      options: {
//        sourceMap: false, // (optional) Generates corresponding .map file. 
//        target: 'ES5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5' 
//        module: 'amd', // (optional) Specify module code generation: 'commonjs' or 'amd' 
//        noImplicitAny: true, // (optional) Warn on expressions and declarations with an implied 'any' type. 
//        noResolve: true, // (optional) Skip resolution and preprocessing. 
//        removeComments: true, // (optional) Do not emit comments to output. 
//        concatenateOutput: false // (optional) Concatenate and emit output to single file. By default true if module option is omited, otherwise false. 
//      },
//      // transforming the filenames 
//      transformPath: function(path) {
//        return path.replace(/\.ts$/, '.js');
//      }
//    },
//
//
//    // test results reporter to use
//    // possible values: 'dots', 'progress'
//    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
//    reporters: ['progress'],    
//    //reporters: ['progress', 'karma-typescript'],
//
//
//    // web server port
//    port: 9876,
//
//
//    // enable / disable colors in the output (reporters and logs)
//    colors: true,
//
//
//    // level of logging
//    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
//    logLevel: config.LOG_ERROR,
//
//
//    // enable / disable watching file and executing tests whenever any file changes
//    autoWatch: true,
//
//
//    // start these browsers
//    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
//    //browsers: ['Chrome', 'PhantomJS'], // chrome not available in Jenkins
//    browsers: ['Chrome'],
//
//    // Continuous Integration mode
//    // if true, Karma captures browsers, runs the tests and exits
//    singleRun: false,
//
//    // Concurrency level
//    // how many browser should be started simultaneous
//    concurrency: Infinity
//  })
//}