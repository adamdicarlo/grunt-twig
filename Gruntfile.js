/*
 * grunt-twig
 * https://github.com/adamdicarlo/grunt-twig
 *
 * Copyright (c) 2013 Adam J. DiCarlo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    twig: {
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options.js': [
            'test/fixtures/conditional.twig',
            'test/fixtures/greeting.twig',
            'test/fixtures/weather.twig'
          ],
        },
      },
      jst_variable_option: {
        options: {
          jst_variable: 'myTemplates'
        },
        files: {
          'tmp/jst_variable_option.js': [
            'test/fixtures/conditional.twig',
            'test/fixtures/greeting.twig',
            'test/fixtures/weather.twig'
          ],
        },
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'twig', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
