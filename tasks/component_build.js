/*jshint node:true */
/*
 * grunt-component
 * https://github.com/anthonyshort/grunt-component-build
 *
 * Copyright (c) 2012 Anthony Short
 * Licensed under the MIT license.
 */

'use strict';

var Builder = require('component-builder');
var fs = require('fs');
var path = require('path');
var template = fs.readFileSync(__dirname + '/../lib/require.tmpl').toString();

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('component_build', 'component-build for grunt.', function() {
    var self = this;
    var opts = this.data;
    var name = opts.name || this.target;
    var verbose = opts.verbose;
    var dir = path.resolve(opts.base || '');
    var output = path.resolve(this.data.output);
    var done = this.async();

    var verboseLog = function(str) {
      if (verbose) {
        grunt.log.writeln(str);
      }
    };

    // The component builder
    var builder = new Builder(dir);

    // Where to output the final file
    builder.copyAssetsTo(output);

    // Prefix urls
    if (opts.prefix) {
      builder.prefixUrls(opts.prefix);
    }

    // Development mode
    if (opts.dev) {
      builder.development();
    }

    if (opts.sourceUrls === true) {
      builder.addSourceURLs();
    }

    // Ignore component parts
    if (opts.ignore) {
      Object.keys(opts.ignore).forEach(function(n) {
        var type = opts.ignore[n];
        builder.ignore(n, type);
      });
    }

    // By default Builder takes the paths of the dependencies
    // from the current directory (here the Gruntfile path).
    // So in case the dependencies are not stored in the /components
    // but in the baseOption/components, we have to add it to the lookup.
    builder.addLookup(path.join(dir, 'components'));

    // The component config
    var config = require(path.join(dir, 'component.json'));

    if (config.paths) {
      config.paths = config.paths.map(function(p) {
        return path.resolve(dir, p);
      });

      builder.addLookup(config.paths);
    }

    // Set the config on the builder. We've modified
    // the original config from the file and this will
    // override settings during the build
    builder.config = config;

    if (opts.plugins) {
      opts.plugins.forEach(function(name) {
        var plugin = require('../plugins/' + name);
        builder.use(plugin);
      });
    }

    // Configure hook
    if (opts.configure) {
      opts.configure.call(this, builder);
    }

    var start = new Date();

    // Build the component
    builder.build(function(err, obj) {
      if (err) {
        grunt.log.error(err.message);
        grunt.fatal(err.message);
      }

      verboseLog('duration: ' + (new Date() - start) + 'ms');

      // Write CSS file
      if (opts.styles !== false) {
        var cssFile = path.join(output, name + '.css');
        grunt.file.write(cssFile, obj.css.trim());

        verboseLog('write: ' + path.join(self.data.output, name + '.css') + ' (' + (obj.css.trim().length / 1024 | 0) + 'kb)');
      }

      // Write JS file
      if (opts.scripts !== false) {
        var jsFile = path.join(output, name + '.js');
        var size = 0;
        if (opts.standalone) {
          // Defines the name of the global variable (window[opts.name]).
          // By default we use the name defined in the component.json,
          // else we use the `standalone` option defined in the Gruntfile.
          obj.name = (typeof opts.standalone === 'string') ? opts.standalone : config.name;
          obj.config = config;

          var string = grunt.template.process(template, { data: obj });
          grunt.file.write(jsFile, string);
          size = string.length;
        } else {
          grunt.file.write(jsFile, obj.require + obj.js);
          size = obj.require.length + obj.js.length;
        }

        verboseLog( 'write: ' + path.join(self.data.output, name + '.js') + ' (' + ( size / 1024 | 0 ) + 'kb)' );
      }

      done();
    });
  });
};
