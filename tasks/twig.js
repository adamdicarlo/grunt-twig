/*
 * grunt-twig
 * https://github.com/adamdicarlo/grunt-twig
 *
 * Copyright (c) 2013 Adam J. DiCarlo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('twig', 'Compile and concatenate Twig templates.', function() {
    var Twig = require('twig');

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      // @todo: a way to control the "base" of filepath.
      // @todo: a configurable prefix?
      jst_variable: 'JST',
      separator: ';\n'
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source and run it through Twig's almost-compiler, which
        // produces an object that can be used to render the template.
        var source = grunt.file.read(filepath);
        var template = JSON.stringify(Twig.twig({ data: source }));
        return options.jst_variable + '["' + filepath + '"]=' + template;
      }).join(grunt.util.normalizelf(options.separator));

      // Resulting code must initialize template array if needed.
      src = 'var ' + options.jst_variable + '=' + options.jst_variable +
        '||{};\n' + src;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
