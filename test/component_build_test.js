'use strict';

var fs = require('fs');
var grunt = require('grunt');
var read = grunt.file.read;

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['component_build'] = {

  build_default: function(test) {
    test.expect(1);
    test.equal(3, fs.readdirSync('tmp/default').length, 'should have 2 files in the build folder');
    test.done();
  },

  build_prod: function(test) {
    test.expect(1);

    var actual = read('tmp/prod/prod.js');
    var expected = read('test/expected/prod/prod.js');

    test.equal(actual, expected, 'should have the same output');

    test.done();
  },

  standalone: function(test) {
    test.expect(1);

    var actual = read('tmp/standalone/standalone.js');
    var expected = read('test/expected/standalone/standalone.js');

    test.equal(actual.trim(), expected.trim(), 'should have the same output');

    test.done();
  },

  norequire: function(test) {
    test.expect(1);

    var actual = read('tmp/norequire/norequire.js');
    var expected = read('test/expected/norequire/norequire.js');

    test.equal(actual, expected, 'should have the same output');

    test.done();
  },

  plugins: function(test) {
    test.expect(1);

    var file = read('tmp/plugins/build.js');
    test.ok(file.indexOf('<html><head></head><body></body></html>') > -1);
    test.done();
  }

};
