var coffee = require('coffee-script');
var path = require('path');
var fs = require('fs');

module.exports = function(builder) {
  builder.hook('before scripts', function(pkg){

    pkg.config.scripts.forEach(function(file, i, scripts){
      if (path.extname(file) !== '.coffee') return;
      var filePath = path.resolve(path.join(pkg.dir, file));
      var str = fs.readFileSync(filePath, 'utf8');
      var compiled = coffee.compile(str, { filename : filePath, bare: true });
      var filename = file.replace('.coffee', '.js');
      pkg.addFile('scripts', filename, compiled);
    });

    // Remove all the coffee files from the scripts
    pkg.config.scripts = pkg.config.scripts.filter(function(file){
      return path.extname(file) !== '.coffee';
    });

    return pkg;
  });
};