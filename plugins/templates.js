var strtojs = require('string-to-js');
var path = require('path');
var fs = require('fs');

module.exports = function(builder) {
  builder.hook('before scripts', function(pkg){
    if( !pkg.config.templates ) return pkg;
    pkg.config.templates.forEach(function(file){
      if (path.extname(file) !== '.html') return;
      var filePath = path.resolve(path.join(pkg.dir, file));
      var str = fs.readFileSync(filePath, 'utf8');
      var compiled = strtojs(str);
      pkg.addFile('scripts', file.replace('.html','.js'), compiled);
    });
    return pkg;
  });
};