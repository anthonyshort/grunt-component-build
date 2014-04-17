'use strict';

var jade = require('builder-jade');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: {
      test: ['tmp', 'build']
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
        latedef: false,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        globals: {}
      }
    },

    // Generates expected files
    shell: {
      expected: {
        command: 'make'
      }
    },

    // Configuration to be run (and then tested).
    componentbuild: {
      test_default: {
        src: './test/fixtures',
        dest: './tmp/default'
      },
      test_dev: {
        options: {
          name: 'dev',
          development: true
        },
        src: './test/fixtures',
        dest: './tmp/dev'
      },
      test_prod: {
        options: {
          name: 'prod',
          styles: false
        },
        src: './test/fixtures',
        dest: './tmp/prod'
      },
      test_standalone: {
        options: {
          name: 'standalone',
          standalone: '$',
          styles: false
        },
        src: './test/fixtures',
        dest: './tmp/standalone'
      },
      test_norequire: {
        options: {
          name: 'norequire',
          require: false,
          styles: false
        },
        src: './test/fixtures',
        dest: './tmp/norequire'
      },
      test_plugins: {
        options: {
          scriptPlugins: function(build) {
            build.use('templates', jade({
              string: true
            }));
          }
        },
        src: './test/fixtures/plugins',
        dest: './tmp/plugins'
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-shell');

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'componentbuild', 'shell:expected', 'nodeunit']);

  // Default task.
  grunt.registerTask('default', ['jshint', 'test']);

};
