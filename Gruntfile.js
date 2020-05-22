module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
      styleWatch: {
        files: ['source/less/**/*.less'],
        tasks: ['less'],
      },
      jsWatch: {
        files: ['source/js/*/*.js'],
        tasks: ['concat'],
      },
    },

    browserSync: {
      serverSync: {
        bsFiles: {
          src: ['source/*.html', 'source/css/*.css', 'source/js/*.js'],
        },
        options: {
          server: 'source/',
          watchTask: true,
        },
      },
    },

    less: {
      styleLess: {
        options: {
          relativeUrls: true,
        },
        files: {
          'source/css/style.css': 'source/less/style.less',
        },
      },
    },

    postcss: {
      stylePrefix: {
        options: {
          processors: [
            require('autoprefixer')(),
          ],
        },
        src: 'source/css/style.css',
      },
    },

    csso: {
      styleMin: {
        options: {
          report: 'gzip',
        },
        expand: true,
        cwd: 'build/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css/',
      },
    },

    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: ['source/js/default/strict.js', 'source/js/default/*.js'],
        dest: 'source/js/scripts-default.js',
      },
      dist2: {
        src: ['source/js/index/strict.js', 'source/js/index/*.js'],
        dest: 'source/js/scripts-index.js',
      },
      dist3: {
        src: ['source/js/photo/strict.js', 'source/js/photo/*.js'],
        dest: 'source/js/scripts-photo.js',
      },
      dist4: {
        src: ['source/js/form/strict.js', 'source/js/form/*.js'],
        dest: 'source/js/scripts-form.js',
      },
    },

    uglify: {
      options: {
        mangle: false,
        expand: true,
      },
      jsMin: {
        files: [{
          expand: true,
          cwd: 'build/js',
          src: '*.js',
          dest: 'build/js'
        }]
      },
    },

    svgstore: {
      options: {
        includeTitleElement: false,
        prefix: 'icon-',
        svg: {
          viewBox: '0 0 100 100',
          xmlns: 'http://www.w3.org/2000/svg',
        },
      },
      svgSprite: {
        files: {
          'source/image/min/sprite.svg': ['source/image/min/*.svg'],
        },
      },
    },

    cwebp: {
      imagesWebp: {
        options: {
          q: 70,
        },
        files: [{
          expand: true,
          cwd: 'source/image/origin/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'source/image/min/',
        }],
      },
    },

    image: {
      imageMin: {
        options: {
          optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
          pngquant: ['--speed=1', '--force', 256],
          zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
          jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
          mozjpeg: ['-optimize', '-progressive'],
          guetzli: ['--quality', 85],
          gifsicle: ['--optimize'],
          svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors'],
        },
        files: [{
          expand: true,
          cwd: 'source/image/origin/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'source/image/min/',
        }],
      },
    },

    clean: {
      buildClean: {
        src: ['build/'],
      },
    },

    copy: {
      buildCopy: {
        files: [{
          expand: true,
          cwd: 'source',
          src: [
            '*.html',
            'fonts/woff2/*',
            'image/min/*',
            'css/style.css',
            'js/*.js',
          ],
          dest: 'build/',
        }],
      },
    },
  });

  grunt.registerTask('serve', [
    'less',
    'concat',
    'browserSync',
    'watch',
  ]);

  grunt.registerTask('imgpress', [
    'cwebp',
    'image',
    'svgstore',
  ]);

  grunt.registerTask('build', [
    'less',
    'concat',
    'clean',
    'copy',
    'postcss',
    'csso',
    'uglify',
  ]);
};
