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
var template = fs.readFileSync( __dirname + '/../lib/require.tmpl').toString();

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('component', 'component-build for grunt.', function() {
    var opts = this.data;
    var name = this.target;
    var output = path.resolve(this.data.output);
    var done = this.async();
    var self = this;

    // The component builder
    var builder = new Builder( path.resolve(path.dirname(this.data.config)) );

    if( opts.sourceUrls === true ) {
      builder.addSourceURLs();
    }

    // Where to output the final file
    builder.copyAssetsTo(output);

    // Ignore component parts
    if( opts.ignore ) {
      Object.keys(opts.ignore).forEach(function(n){
        var type = opts.ignore[n];
        builder.ignore(n, type);
      });
    }

    // The component config
    var config = require( path.resolve(this.data.base, 'component.json') );

    // Add in extra scripts during the build since Component makes
    // us define each and every file in our component to build it.
    config.scripts = grunt.file.expand( config.scripts || [] );
    config.templates = grunt.file.expand( config.templates || [] );

    if( config.paths ) {
      builder.addLookup(config.paths);
    }

    // Prefix urls
    if( this.data.prefix ) {
      builder.prefixUrls(this.data.prefix);
    }

    // Development mode
    if( this.data.dev ) {
      builder.development();
    }

    // Set the config on the builder. We've modified
    // the original config from the file and this will
    // override settings during the build
    builder.conf = config;

    if( opts.plugins ) {
      opts.plugins.forEach(function(name){
        var plugin = require('../plugins/' + name);
        builder.use(plugin);
      });
    }

    // Configure hook
    if( opts.configure ) {
      opts.configure.call(this, builder);
    }

    // Build the component
    builder.build(function(err, obj){

      if (err) {
        grunt.log.error( err.message );
        grunt.fatal( err.message );
      }

      // Write CSS file
      if( opts.styles !== false ) {
        var cssFile = path.join(output, name + '.css');
        grunt.file.write(cssFile, obj.css);
      }

      // Write JS file
      if( opts.scripts !== false ) {
        var jsFile = path.join(output, name + '.js');
        if( opts.standalone ) {
          obj.name = name;
          obj.config = config;
          var string = grunt.template.process(template, {
            data: obj
          });
          grunt.file.write(jsFile, string);
        }
        else {
          grunt.file.write(jsFile, obj.require + obj.js);
        }
      }

      done();

    });
  });

};
