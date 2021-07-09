'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    terser  = require('gulp-terser'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    // rigger = require('gulp-rigger'),
    fileinclude = require('gulp-file-include'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    postcss = require('gulp-postcss'),
    mqpacker = require('css-mqpacker'),
    sortCSSmq = require('sort-css-media-queries'),
    reload = browserSync.reload;

    var path = {
        build: { 
          html: 'dist/',
          js: 'dist/js/',
          css: 'dist/css/',
          img: 'dist/images/',
          fonts: 'dist/fonts/'
        },
        src: { 
          html: 'src/*.html',
          js: ['src/js/*.js'],
          style: 'src/scss/main.scss',
          img: 'src/images/**/*.*',
          fonts: 'src/fonts/**/*.*'
        },
        watch: { 
          html: 'src/**/*.html',
          js: 'src/js/**/*.js',
          style: 'src/scss/**/*.scss',
          img: 'src/images/**/*.*',
          fonts: 'src/fonts/**/*.*'
        },
        clean: './dist'
  };

  var config = {
      server: {
          baseDir: "./dist"
      },
      tunnel: false,
      host: 'localhost',
      port: 9000,
      logPrefix: "Frontend"
};

gulp.task('html:build', async function () {
  gulp.src(path.src.html) 
      // .pipe(rigger()) 
      .pipe(fileinclude()) 
      .pipe(gulp.dest(path.build.html))
      .pipe(reload({stream: true})); 
});

gulp.task('js:build', async function () {
  gulp.src(path.src.js) 
      // .pipe(rigger()) 
      .pipe(fileinclude()) 
      .pipe(sourcemaps.init()) 
      .pipe(terser()) 
      .pipe(sourcemaps.write()) 
      .pipe(gulp.dest(path.build.js)) 
      .pipe(reload({stream: true})); 
});

gulp.task('style:build', async function () {
    gulp.src(path.src.style) 
        .pipe(sourcemaps.init()) 
        .pipe(sass().on('error', sass.logError)) 
        .pipe(prefixer('last 2 versions')) 
        .pipe(postcss([mqpacker({
          sort: sortCSSmq
        })]))
        // .pipe(cssmin()) 
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) 
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', async function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});


//compressing all images

var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminZopfli = require('imagemin-zopfli');
var imageminMozjpeg = require('imagemin-mozjpeg'); //need to run 'brew install libpng'
var imageminGiflossy = require('imagemin-giflossy');

gulp.task('image:build', async function() {
  return gulp.src(path.src.img)
      .pipe(cache(imagemin([
          //png
          imageminPngquant({
              speed: 1,
              quality: [0.95, 1] //lossy settings
          }),
          imageminZopfli({
              more: true
              // iterations: 50 // very slow but more effective
          }),
          //gif
          // imagemin.gifsicle({
          //     interlaced: true,
          //     optimizationLevel: 3
          // }),
          //gif very light lossy, use only one of gifsicle or Giflossy
          imageminGiflossy({
              optimizationLevel: 3,
              optimize: 3, //keep-empty: Preserve empty transparent frames
              lossy: 2
          }),
          //svg
          imagemin.svgo({
              plugins: [{
                  removeViewBox: false
              }]
          }),
          //jpg lossless
          imagemin.jpegtran({
              progressive: true
          }),
          //jpg very light lossy, use vs jpegtran
          imageminMozjpeg({
              quality: 90
          })
      ])))
      .pipe(gulp.dest(path.build.img));
});

gulp.task('build', gulp.series( 
  'html:build',
  'js:build',
  'style:build',
  'fonts:build',
  'image:build'
));

gulp.task('watch', function(){
  watch([path.watch.html], function(event, cb) {
    gulp.parallel('html:build');
  });
});

gulp.task('watch', function(done){
  gulp.watch([path.watch.html], gulp.series('html:build')),
  gulp.watch([path.watch.style], gulp.series('style:build')),
  gulp.watch([path.watch.js], gulp.series('js:build')),
  gulp.watch([path.watch.img], gulp.series('image:build')),
  gulp.watch([path.watch.fonts], gulp.series('fonts:build')),
  done();
});

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('default', gulp.parallel('build', 'webserver', 'watch'));