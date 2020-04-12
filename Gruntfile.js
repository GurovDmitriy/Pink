"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    less: {
      style: {
        files: {
          "source/css/style.css": "source/less/style.less"
        }
      }
    },
    watch: {
      style: {
        files: ["source/less/**/*.less"],
        tasks: ["less"]
      }
    },
    browserSync: {
      server: {
        bsFiles: {
          src: ["source/*.html", "source/css/*.css"]
        },
        options: {
          server: "source/",
          watchTask: true
        }
      }
    }
  });
  grunt.registerTask("serve", ["browserSync", "watch"]);
};
