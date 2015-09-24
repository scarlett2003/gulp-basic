/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 * https://987.tw/2014/07/09/gulpru-men-zhi-nan/ 中譯版
 */

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');


//  流程 input src -> pipe function -> output dest
//  css/*.css -> files ending in .css in the css directory
// 	css/**/*.css -> files ending in .css in the css directory and child directionies
//  !css/style.css -> excludes style.css file
//  *.+(js|css) -> Matches all files in the root directory ending in .js or .css

// gulp-ruby-sass
gulp.task('styles', function() {
  return sass('app/sass/style.sass', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('app/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('app/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});


// Scripts
gulp.task('scripts', function() {
  return gulp.src('app/js/**/*.js')
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('app/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});


// Images
gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('app/images'))
    .pipe(notify({ message: 'Images task complete' }));
});


// Clean 執行這個，以下資料夾會被清空
// gulp.task('clean', function(cb) {
//     del(['app/css', 'app/js', 'app/images'], cb)
// });

// Default task
// gulp.task('default', ['clean'], function() {
//     gulp.start('styles', 'scripts', 'images');
// });

// Default Task
gulp.task('default',['scripts', 'styles', 'images']);


// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('app/sass/**/*.sass', ['styles']);

  // Watch .js files
  gulp.watch('app/js/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('app/images/**/*', ['images']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['app/**']).on('change', livereload.changed);

});


