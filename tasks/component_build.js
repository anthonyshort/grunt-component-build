/*jshint node:true */
/*
 * grunt-component-build
 * https://github.com/anthonyshort/grunt-component-build
 *
 * Copyright (c) 2014 Anthony Short
 * Licensed under the MIT license.
 */

'use strict';

var async = require('async');
var builder = require('../lib/build');

module.exports = function(grunt) {
  grunt.registerMultiTask('componentbuild', 'component-build for grunt.', function() {
    var options = this.options({
      name: 'build',
      development: false,
      install: true,
      verbose: true,
      require: true,
      copy: false,
      scripts: true,
      styles: true,
      files: true,
      standalone: '',
      prefix: '',
      browsers: ''
    });

    var done = this.async();
    var componentbuild = builder(grunt, options);

    async.eachSeries(this.files, build, end);

    function build(file, done) {
      async.eachSeries(file.src, function(dir, next) {
        componentbuild(dir, file.dest, next);
      }, done);
    }

    function end(err) {
      if (err) {
        grunt.fail.fatal(err.message);
        return done(false);
      }

      done();
    }
  });
};
