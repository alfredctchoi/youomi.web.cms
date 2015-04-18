'use strict';

var gulp = require('gulp'),
  ngConstant = require('gulp-ng-constant');

module.exports = function(options) {

  gulp.task('config', function () {
    var myConfig = require('../config.json');
    var envConfig = myConfig[options.env];

    return ngConstant({
      constants: envConfig,
      name: 'youomi.configs',
      stream: true,
      wrap: '/* jshint ignore:start */<%= __ngModule %>/* jshint ignore:end */'
    })
      .pipe(gulp.dest('src/app'));
  });

  //gulp.task('config', function () {
  //  gulp.src('configs/local.json')
  //    .pipe(ngConstant({
  //      name: 'youomi.configs'
  //      //constants: { myPropCnt: 'hola!' },
  //      //wrap: 'amd'
  //    }))
  //    // Writes config.js to dist/ folder
  //    .pipe(gulp.dest('src/app'));
  //});
};
