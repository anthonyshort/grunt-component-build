var Emitter = require('emitter');
var localDep = require('local-dep');

module.exports = Foo;

function Foo() {
  console.log(localDep);
}

Emitter(Foo.prototype);

Foo.prototype.bar = function() {
  this.emit('bar');
};