var Builder = require('component-builder');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var join = path.join;
var Handlebars = require('handlebars');
var template = Handlebars.compile(fs.readFileSync(__dirname + '/require.hbs').toString());

module.exports = function(grunt, options) {
  return function(dir, output, done) {
    if(!fs.existsSync(dir + '/component.json')) return done();

    if(!output) {
      output = join(dir, 'build');
    }

    mkdirp.sync(output);

    var builder = new Builder(dir);
    builder.copyAssetsTo(output);

    var config = grunt.file.readJSON(path.join(dir, 'component.json'));

    config.paths = (config.paths || []).map(function(p) {
      return path.resolve(dir, p);
    });

    var standalone = typeof options.standalone === 'string' ? options.standalone : config.name;

    if (options.prefix) {
      builder.prefixUrls(options.prefix);
    }

    if (options.dev) {
      builder.development();
    }

    if (options.sourceUrls) {
      builder.addSourceURLs();
    }

    if(options.copy) {
      builder.copyFiles();
    }

    if (options.ignore) {
      Object.keys(options.ignore).forEach(function(n) {
        var type = options.ignore[n];
        
        if (Array.isArray(type)) {
          type.forEach(function(t) {
            builder.ignore(n, t);
          });
        } else {
          builder.ignore(n, type);
        }
      });
    }

    // By default Builder takes the paths of the dependencies
    // from the current directory (here the Gruntfile path).
    // So in case the dependencies are not stored in the /components
    // but in the baseOption/components, we have to add it to the lookup.
    builder.addLookup(path.join(dir, 'components'));
    builder.addLookup(config.paths);

    // Set the config on the builder. We've modified
    // the original config from the file and this will
    // override settings during the build
    builder.config = config;

    if (options.configure) {
      options.configure.call(this, builder);
    }

    builder.build(function(err, obj) {
      if (err) return done(err);

      var cssFile = join(output, options.name) + '.css';
      var jsFile = join(output, options.name) + '.js';

      if (obj.css.trim() != "") {
        fs.writeFileSync(cssFile, obj.css.trim());
      }

      if (obj.js.trim() != "") {
        if (options.standalone) {
          obj.name = standalone;
          obj.config = config;
          var string = template(obj);
          fs.writeFileSync(jsFile, string);
        }
        else if(options.noRequire) {
          fs.writeFileSync(jsFile, obj.js);
        }
        else {
          fs.writeFileSync(jsFile, obj.require + obj.js);
        }
      }

      done();
    });
  };
}
