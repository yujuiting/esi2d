// Karma configuration

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'jasmine'],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // list of files / patterns to load in the browser
    files: [
      // Testing spec
      'src/**/*.spec.ts',
    ],

    
    preprocessors: {
      'src/**/*.spec.ts': ['browserify']
    },


    // list of files to exclude
    exclude: [
    ],


    browserify: {
      debug: true,
      plugin: [['tsify', { target: 'es5'}]]
    },


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity

    
  });
};
