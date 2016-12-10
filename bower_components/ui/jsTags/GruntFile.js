module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    debugFilePath: 'jsTag/compiled/<%= pkg.name %>.debug.js',
    srcFiles: [
      'jsTag/source/javascripts/app.js',
      'jsTag/source/javascripts/filters.js',
      'jsTag/source/javascripts/models/default/jsTag.js',
      'jsTag/source/javascripts/models/default/jsTagsCollection.js',
      'jsTag/source/javascripts/services/inputService.js',
      'jsTag/source/javascripts/services/tagsInputService.js',
      'jsTag/source/javascripts/services.js',
      'jsTag/source/javascripts/controllers.js',
      'jsTag/source/javascripts/directives.js',
      '<%= ngtemplates.jsTag.dest %>'
    ],
    ngtemplates: {
      jsTag: {
        src: ['jsTag/source/templates/*/**.html'],
        dest: 'tmp/templates.js'
      }
    },
    concat: {
      versionJS: {
        options: {
          banner: '/************************************************\n' +
            '* jsTag JavaScript Library - Editing tags based on angularJS \n' +
            '* Git: https://github.com/eranhirs/jsTag/tree/master\n' +
            '* License: MIT (http://www.opensource.org/licenses/mit-license.php)\n' +
            '* Compiled At: <%= grunt.template.today("mm/dd/yyyy HH:MM") %>\n' +
            '**************************************************/\n' +
            '\'use strict\';\n',
          footer: '\n\n'
        },
        src: ['<%= srcFiles %>'],
        dest: '<%= debugFilePath%>'
      },
      versionCSS: {
        src: ['jsTag/source/stylesheets/js-tag.css'],
        dest: 'jsTag/compiled/<%= pkg.name %>.css'
      }
    },
    uglify: {
      versionJS: {
        src: ['<%= debugFilePath%>'],
        dest: 'jsTag/compiled/<%= pkg.name %>.min.js'
      }
    },
    clean: {
      tempFiles: {
        src: ['tmp/']
      }
    }
  });
  
  // Load used plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Build task
  grunt.registerTask('version', ['ngtemplates', 'concat:versionCSS', 'concat:versionJS', 'uglify:versionJS', 'clean']);
};