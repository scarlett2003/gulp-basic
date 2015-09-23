var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	compass = require('gulp-compass'),
	rename = require('gulp-rename');



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

// Compass Sass Task
gulp.task('compass', function(){
	gulp.src('app/scss/style.scss')
		.pipe(compass({
			config_file: './config.rb',
			css: 'app/css',
			sass: 'app.scss'
		}))
		.pipe(gulp.dest('app/css/'));
});


// Watch Task
gulp.task('watch', function(){
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/scss/**/*.scss', ['compass']);
});




// Default Task
gulp.task('default',['scripts', 'watch', 'compass']);