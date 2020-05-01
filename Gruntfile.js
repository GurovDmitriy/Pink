module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);


  grunt.initConfig({
    watch: {
      styleWatch: {
        files: ["source/less/**/*.less"],
        tasks: ["less"]
      }
    },

    browserSync: {
      serverSync: {
        bsFiles: {
          src: ["source/*.html", "source/css/*.css"]
        },
        options: {
          server: "source/",
          watchTask: true
        }
      }
    },

    less: {
      styleLess: {
        options: {
          relativeUrls: true
        },
        files: {
          "source/css/style.css": "source/less/style.less"
        }
      }
    },

    postcss: {
      stylePrefix: {
        options: {
          processors: [
          require("autoprefixer")()
        ]
      },
      src: "source/css/style.css"
      }
    },

    csso: {
      styleMin: {
        options: {
          report: "gzip"
        },
        expand: true,
        cwd: "build/css/",
        src: ["*.css"],
        dest: "build/css/"
      }
    },

    svgstore: {
      options: {
        includeTitleElement: false,
        prefix : "icon-",
        svg: {
          viewBox : "0 0 100 100",
          xmlns: "http://www.w3.org/2000/svg"
        }
      },
      svgSprite: {
        files: {
          "source/image/min/sprite.svg": ["source/image/origin/*.svg"]
        }
      }
    },

    cwebp: {
      imagesWebp: {
        options: {
          q: 70
        },
        files: [{
          expand:true,
          cwd: "source/image/origin/",
          src: ["**/*.{png,jpg,gif}"],
          dest: "source/image/min/"
        }]
      }
    },

    image: {
      imageMin: {
        options: {
          optipng: ["-i 1", "-strip all", "-fix", "-o7", "-force"],
          pngquant: ["--speed=1", "--force", 256],
          zopflipng: ["-y", "--lossy_8bit", "--lossy_transparent"],
          jpegRecompress: ["--strip", "--quality", "medium", "--min", 40, "--max", 80],
          mozjpeg: ["-optimize", "-progressive"],
          guetzli: ["--quality", 85],
          gifsicle: ["--optimize"],
          svgo: ["--enable", "cleanupIDs", "--disable", "convertColors"]
        },
        files: [{
          expand: true,
          cwd: "source/image/origin/",
          src: ["**/*.{png,jpg,gif,svg}"],
          dest: "source/image/min/"
        }]
      }
    },

    clean: {
      buildClean: {
        src: ["build/"]
      }
    },

    copy: {
      copyToBuild: {
        expand: true,
        cwd: "source/",
        src: [
          "fonts/**/*.{woff,woff2}",
          "*.html",
          "css/*.css",
          "image/**/*",
          "js/*"
        ],
        dest: "build/"
      }
    }
  });

  grunt.registerTask("serve", [
    "browserSync",
    "watch"
  ]);

  grunt.registerTask("imgpress", [
    "cwebp",
    "image",
    "svgstore"
  ]);

  grunt.registerTask("build", [
    "clean",
    "copy",
    "csso"
  ]);
};
