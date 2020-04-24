"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    svgstore: {
      options: {
        includeTitleElement: false
      },
      sprite: {
        files: {
          "source/image/min/sprite.svg": ["source/image/origin/*-icon.svg"]
        }
      }
    },
    cwebp: {
      images: {
        options: {
          q: 90
        },
        files: [{
          expand: true,
          cwd: "source/image/origin/",
          src: ["**/*.{png,jpg,gif}"],
          dest: "source/image/min/"
        }]
      }
    },
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
          },
          files: [{
            expand: true,
            cwd: "source/image/origin/",
            src: ["**/*.{png,jpg,gif}"],
            dest: "source/image/"
            }]
          }
        },
    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "source/css/style-min.css": ["source/css/style.css"]
        }
      }
    },
    less: {
      style: {
        files: {
          "source/css/style.css": "source/less/style.less"
        }
      }
    },
    watch: {
      style: {
        files: ["source/less/**/*"],
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
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    }
  });
  grunt.registerTask("serve", ["browserSync", "watch"]);
};
