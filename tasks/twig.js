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

    // Merge task-specific and/or target-specific options with these defaults.
    // We use Twig templates to define the output format of your compiled Twig
    // templates. (Because we heard you like Twig templates.)
    var options = this.options({
      amd_wrapper: true,
      variable: 'window.JST',
      separator: '\n',
      template: '{{ variable }} = {{ variable }} || {};\n{{ templates }}\n',
      each_template: '{{ variable }}["{{ filepath }}"] = Twig.twig({ data: {{ compiled }} });',
      template_key: function(path) { return path; }
    });

    // Compile *our* templates.
    options.template = Twig.twig({ data: options.template });
    options.each_template = Twig.twig({ data: options.each_template });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files.
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        return true;
      }).map(function(filepath) {
        // Read file source and run it through Twig's almost-compiler, which
        // produces an object that can be used to render the template.
        var source = grunt.file.read(filepath);

        try {
          return options.each_template.render({
            variable: options.variable,
            filepath: options.template_key(filepath),
            compiled: JSON.stringify(Twig.twig({ data: source }).tokens),
          });
        } catch (e) {
          grunt.log.warn(e);
        }
      }).join(grunt.util.normalizelf(options.separator));

      // Apply overall template.
      src = options.template.render({ variable: options.variable, templates: src });

      // Provide an AMD wrapper if requested.
      if (options.amd_wrapper) {
        src = 'require(["twig"], function(Twig) {\n' + src + '});\n';
      }

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });
};
