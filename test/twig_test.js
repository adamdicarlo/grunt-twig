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
  default_options: function(test) {
    test.expect(1);

    // @todo: Use node-falafel + cssauron-falafel to examine the AST of the
    // code we've generated, rather than this brute-force method?
    var actual = grunt.file.read('tmp/default_options.js');
    var expected = grunt.file.read('test/expected/default_options.js');
    test.equal(actual, expected, 'templates should be compiled and stored in JST variable.');

    test.done();
  },
  variable_option: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/variable_option.js');
    var expected = grunt.file.read('test/expected/variable_option.js');
    test.equal(actual, expected, 'templates should be compiled and stored in the variable indicated by "variable" option.');

    test.done();
  },
};
