'use strict';

var Build = require('component-build');
var Resolve = require('component-resolver');
var fs = require('fs');
var path = require('path');
var async = require('async');
var join = path.join;

module.exports = function(grunt, options) {
  return function(dir, output, done) {
    if (!fs.existsSync(dir + '/component.json')) return done();

    options.destination = join(output);
    options.out = join(dir, 'components');

    var start = Date.now();

    Resolve(path.resolve(dir), options, function(err, tree) {
      if (err) return done(err);
      if (options.verbose) grunt.log.writeln('resolved in ' + (Date.now() - start) + 'ms');

      var build = new Build(tree, options);
      async.parallel([buildScripts, buildStyles, buildFiles], done);

      function buildScripts(cb) {
        if (!options.scripts) return cb();

        var start = Date.now();

        build.scripts(function(err, js) {
          if (err) return cb(err);
          if (!js) return cb();

          var jsPath = join(options.destination, options.name + '.js');
          grunt.file.write(jsPath, js);

          if (options.verbose) grunt.log.oklns('build: ' + jsPath + ' in ' + (Date.now() - start) + 'ms - ' + (js.length / 1024 | 0) + 'kb');

          cb();
        });
      }

      function buildStyles(cb) {
        if (!options.styles) return cb();

        var start = Date.now();

        build.styles(function(err, css) {
          if (err) return cb(err);
          if (!css) return cb();

          var cssPath = join(options.destination, options.name + '.css');
          grunt.file.write(cssPath, css);

          if (options.verbose) grunt.log.oklns('build: ' + cssPath + ' in ' + (Date.now() - start) + 'ms - ' + (css.length / 1024 | 0) + 'kb');

          cb();
        });
      }

      function buildFiles(cb) {
        if (!options.files) return cb();

        var start = Date.now();

        build.files(function(err) {
          if (err) return cb(err);
          if (options.verbose) grunt.log.oklns('build: ' + 'files in ' + (Date.now() - start) + 'ms');

          cb();
        });
      }
    });
  };
};
