/*
 * grunt-component
 * https://github.com/anthonyshort/grunt-component-build
 *
 * Copyright (c) 2012 Anthony Short
 * Licensed under the MIT license.
 */

var Builder = require('component-builder');
var fs = require('fs');
var path = require('path');
var template = fs.readFileSync('./node_modules/grunt-component/lib/require.js');

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('component', 'Your task description goes here.', function() {
    var opts = this.data;
    var name = this.target;
    var output = path.resolve(this.data.output);

    // The component builder
    var builder = new Builder( path.resolve(path.dirname(this.data.config)) );

    // Where to output the final file
    builder.copyAssetsTo(output);

    // Ignore component parts
    if( this.data.ignore ) {
      Object.keys(this.data.ignore).forEach(function(n){
        var type = this.data.ignore[n];
        builder.ignore(n, type);
      });
    }

    // The component config
    var config = require( path.resolve(this.data.base, 'component.json') );

    // The scripts that will be included in the bundle
    config.scripts = config.scripts || [];

    // Add in extra scripts during the build since Component makes
    // us define each and every file in our component to build it.
    if( this.data.scripts ) {
      config.scripts = grunt.file.expandFiles(this.data.scripts);
    }

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

    // Build the component
    builder.build(function(err, obj){
      console.log( 'foo' );

      if (err) {
        grunt.log.error( err.message );
        grunt.fatal( err.message );
      }

      var jsFile = path.join(output, name + '.js');
      var cssFile = path.join(output, name + '.css');
      var js = fs.createWriteStream(jsFile);
      var css = fs.createWriteStream(cssFile);

      // Write CSS file
      if( opts.styles !== false ) {
        css.write(obj.css);
      }

      // Write JS file
      if( opts.scripts !== false ) {
        if( opts.standalone ) {
          var string = grunt.template.process(template, {
            data: obj,
            config: config,
            name: name
          });
          js.write(string);
        }
        else {
          js.write(obj.require);
          js.write(obj.js);
        }       
      }

    });
  });

};
