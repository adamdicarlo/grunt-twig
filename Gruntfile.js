/*
 * grunt-twig
 * https://github.com/adamdicarlo/grunt-twig
 *
 * Copyright (c) 2013 Adam J. DiCarlo
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

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
        options: {},
        files: {
          'tmp/default_options.js': [
            'test/fixtures/conditional.twig',
            'test/fixtures/greeting.twig',
            'test/fixtures/weather.twig'
          ],
        },
      },
      variable_option: {
        options: {
          variable: 'myTemplates'
        },
        files: {
          'tmp/variable_option.js': [
            'test/fixtures/conditional.twig',
            'test/fixtures/greeting.twig',
            'test/fixtures/weather.twig'
          ],
        },
      },
      template_key_option: {
        options: {
          template_key: path.basename
        },
        files: {
          'tmp/template_key_option.js': [
            'test/fixtures/greeting.twig',
            'test/fixtures/weather.twig',
            'test/fixtures/conditional.twig'
          ],
        },
      },
      example1: {
        options: {},
        files: {
          'tmp/my-compiled-templates.js': [ 'src/testing.twig', 'src/hello.twig' ]
        }
      }
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
