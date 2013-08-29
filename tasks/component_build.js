/*jshint node:true */
/*
 * grunt-component-build
 * https://github.com/anthonyshort/grunt-component-build
 *
 * Copyright (c) 2013 Anthony Short
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var builder = require('../lib/build');
var async = require('async');

module.exports = function(grunt) {
  grunt.registerMultiTask('componentbuild', 'component-build for grunt.', function() {

    var options = this.options({
      name: 'build',
      dev: false,
      sourceUrls: false,
      ignore: {},
      standalone: false,
      paths: [],
      prefix: false,
      copy: false,
      noRequire: false
    });

    var done = this.async();
    var componentbuild = builder(grunt, options);

    function build(file, done) {
      async.eachSeries(file.src, function(dir, next){
        grunt.log.writeln(dir);
        componentbuild(dir, file.dest, next);
      }, done);
    }

    function end(err) {
      if(err) {
        grunt.fail.fatal(err.message);
        return done(false);
      }
      done();
    }

    async.eachSeries(this.files, build, end);
  });
};
