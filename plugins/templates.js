var strtojs = require('string-to-js');
var path = require('path');
var fs = require('fs');

module.exports = function(builder) {
  builder.hook('before scripts', function(pkg){
    if( !pkg.conf.templates ) return pkg;
    pkg.conf.templates.forEach(function(file){
      if (path.extname(file) !== '.html') return;
      var str = fs.readFileSync(file, 'utf8');
      var compiled = strtojs(str);
      pkg.addFile('scripts', file.replace('.html','.js'), compiled);
    });
    return pkg;
  });
};