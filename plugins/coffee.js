var coffee = require('coffee-script');
var path = require('path');
var fs = require('fs');

module.exports = function(builder) {
  builder.hook('before scripts', function(pkg){

    pkg.conf.scripts.forEach(function(file, i, scripts){
      if (path.extname(file) !== '.coffee') return;
      var str = fs.readFileSync(file, 'utf8');
      var compiled = coffee.compile(str, { filename : file, bare: true });
      var filename = file.replace('.coffee', '.js');
      pkg.addFile('scripts', filename, compiled);
    });

    // Remove all the coffee files from the scripts
    pkg.conf.scripts = pkg.conf.scripts.filter(function(file){
      return path.extname(file) !== '.coffee';
    });

    return pkg;
  });
};