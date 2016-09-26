'use strict';

var grunt = require('grunt');

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
exports.twig = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  test_options: function(test) {
    var names = [
      'default_options',
      'variable_option',
      'template_key_option',
      'amd_define_option'
    ];

    test.expect(names.length);
    names.forEach(function(name) {
      var actual = grunt.file.read('tmp/' + name + '.js');
      var expected = grunt.file.read('test/expected/' + name + '.js');
      test.equal(actual, expected);
    });
    test.done();
  }
};
