/*
 * grunt-twig
 * https://github.com/adamdicarlo/grunt-twig
 *
 * Copyright (c) 2013 Adam J. DiCarlo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.registerMultiTask('twig', 'Compile and concatenate Twig templates.', function() {
    var Twig = require('twig');
    var path = require('path');

    // Merge task-specific and/or target-specific options with these defaults.
    // We use Twig templates to define the output format of your compiled Twig
    // templates. (Because we heard you like Twig templates.)
    var options = this.options({
      amd_wrapper: true,
      separator: '\n',
      template: 'var templates = {};\n{{ templates }}\nreturn templates;',
      each_template: ['templates["{{ filepath }}"] = Twig.twig({',
                      '    data: {{ compiled }},',
                      '    id: "{{ filepath }}",',
                      '    allowInlineIncludes: true',
                      '});\n'].join('\n')
    });

    // Compile *our* templates.
    options.template = Twig.twig({ data: options.template });
    options.each_template = Twig.twig({ data: options.each_template });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.map(function(filepath) {
        // Read file source and run it through Twig's almost-compiler, which
        // produces an object that can be used to render the template.
        var source = grunt.file.read(filepath);

        return options.each_template.render({
          filepath: filepath,
          compiled: JSON.stringify(Twig.twig({ data: source }).tokens),
        });
      }).join(grunt.util.normalizelf(options.separator));

      // Apply overall template.
      src = options.template.render({ templates: src });

      // Always provide a AMD wrapper
      src = 'define(["twig"], function(Twig) {\n' + src + '});\n';

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });
};
