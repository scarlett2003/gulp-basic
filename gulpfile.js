var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycess = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	// compass = require('gulp-compass'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify');



//  流程 input src -> pipe function -> output dest
//  css/*.css -> files ending in .css in the css directory
// 	css/**/*.css -> files ending in .css in the css directory and child directionies
//  !css/style.css -> excludes style.css file
//  *.+(js|css) -> Matches all files in the root directory ending in .js or .css

// 19:34

// Script Task
gulp.task('scripts', function() {
	// console.log('It worked Dude!');
	gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});



// gulp-ruby-sass
gulp.task('styles', function() {
  return sass('app/scss/style.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('app/css'))
    .pipe(rename({ suffix: '.min' }))
    // .pipe(minifycss())
    // .pipe(gulp.dest('app/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});


// Watch Task
gulp.task('watch', function(){
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/scss/**/*.scss', ['compass']);
});




// Default Task
gulp.task('default',['scripts', 'watch', 'compass']);