module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    concurrent: {
      targetWatch: ['watch:styleWatch', 'watch:jsWatch'],
      targetWatchDev: ['watch:HtmlWatchDev', 'watch:styleWatchDev', 'watch:jsWatchDev'],
    },

    watch: {
      styleWatch: {
        files: ['source/less/**/*.less'],
        tasks: ['less'],
      },
      jsWatch: {
        files: ['source/js/*/*.js'],
        tasks: ['concat'],
      },
      HtmlWatchDev: {
        files: ['source/*.html'],
        tasks: ['clean:buildCleanHtmlDev', 'copy:buildHtmlCopy'],
      },
      styleWatchDev: {
        files: ['source/less/**/*.less'],
        tasks: ['less', 'clean:buildCleanStyleDev', 'copy:buildStyleCopy', 'postcss', 'csso'],
      },
      jsWatchDev: {
        files: ['source/js/*/*.js'],
        tasks: ['concat', 'clean:buildCleanJsDev', 'copy:buildJsCopy', 'uglify'],
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
      serverSyncDev: {
        bsFiles: {
          src: ['build/*.html', 'build/css/*.css', 'build/js/*.js'],
        },
        options: {
          server: 'build/',
          watchTask: true,
        },
      },
    },

    compress: {
      dist: {
        options: {
          mode: 'brotli',
/*          brotli: {
            mode: 1
          },*/
        },
        expand: true,
        cwd: 'build/',
        src: ['**/*'],
        dest: 'build/'
      }
    },

    connect: {
      server_gzip: {
        options: {
          port: 3000,
          livereload: false,
          base: 'build',
          middleware: function(connect, options, middlewares) {
            middlewares.unshift(function(req, res, next) {
              res.setHeader('Content-Encoding', 'brotli');
              return next();
              });
            return middlewares;
          },
        }
      }
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
        src: 'build/css/style.css',
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

    critical: {
      test: {
        options: {
          base: './',
          css: [
              'build/css/style.css',
          ],
          width: 320,
          height: 100
        },
        src: 'build/index.html',
        dest: 'build/index.html'
      }
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
      buildCleanStyleDev: {
        src: ['build/css/'],
      },
      buildCleanJsDev: {
        src: ['build/js/'],
      },
      buildCleanHtmlDev: {
        src: ['build/*.html'],
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
      buildStyleCopy: {
        files: [{
          expand: true,
          cwd: 'source',
          src: [
            'css/style.css',
          ],
          dest: 'build/',
        }],
      },
      buildJsCopy: {
        files: [{
          expand: true,
          cwd: 'source',
          src: [
            'js/*.js',
          ],
          dest: 'build/',
        }],
      },
      buildHtmlCopy: {
        files: [{
          expand: true,
          cwd: 'source',
          src: [
            '*.html',
          ],
          dest: 'build/',
        }],
      },
    },
  });

  grunt.registerTask('serve', [
    'less',
    'concat',
    'browserSync:serverSync',
    'concurrent:targetWatch',
  ]);

  grunt.registerTask('serveDev', [
    'less',
    'concat',
    'clean:buildClean',
    'copy:buildCopy',
    'postcss',
    'csso',
    'uglify',
/*    'critical',*/
/*    'compress',*/
/*    'connect',*/
    'browserSync:serverSyncDev',
    'concurrent:targetWatchDev',
  ]);

  grunt.registerTask('imgpress', [
    'cwebp',
    'image',
    'svgstore',
  ]);

  grunt.registerTask('build', [
    'less',
    'concat',
    'clean:buildClean',
    'copy:buildCopy',
    'postcss',
    'csso',
    'uglify',
  ]);
};
