'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: {
      test: ['tmp']
    },

    nodeunit: {
      test: ['test/**/*_test.js']
    },

    watch: {
      files: '<%= jshint.all %>',
      tasks: 'default'
    },

    jshint: {
      all: ['Gruntfile.js', 'tasks/**/*.js', '<%= nodeunit.test %>'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
        globals: {}
      }
    },

    // Configuration to be run (and then tested).
    component_build: {
      test_dev: {
        base: './test/fixtures/src',
        output: './tmp/dev',
        name: 'dev',
        dev: true,
        sourceUrls: true
      },
      test_prod: {
        base: './test/fixtures/src',
        output: './tmp/prod',
        name: 'prod',
        styles: false
      },
      test_standalone: {
        base: './test/fixtures/src',
        output: './tmp/standalone',
        name: 'standalone',
        standalone: '$',
        styles: false
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'component_build', 'nodeunit']);

  // Default task.
  grunt.registerTask('default', ['jshint', 'test']);

};
