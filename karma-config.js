var istanbul = require('browserify-istanbul');
// Karma configuration

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'jasmine'],

    plugins: [
      require('karma-coverage'),
      require('karma-jasmine'),
      require('karma-mocha-reporter'),
      require('karma-sourcemap-loader'),
      require('karma-browserify'),
      require('karma-chrome-launcher')
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // list of files / patterns to load in the browser
    files: [
      // Testing spec
      'src/**/*.ts',
    ],

    
    preprocessors: {
      'src/**/*.ts': ['browserify', 'coverage', 'sourcemap']
    },


    // list of files to exclude
    exclude: [
    ],


    browserify: {
      debug: true,
      plugin: [['tsify', { target: 'es5'}]]
    },

    coverageReporter: {
      dir: './coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'json' },
        { type: 'html' },
        { type: 'json',      subdir: '.', file: 'coverage-final.json' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.xml' },
      ]
    },


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity

    
  });
};
