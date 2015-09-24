/////////////////////////////////////
// Required
/////////////////////////////////////

// run npm install gulp-bower gulp-sass
var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	minifyHTML = require('gulp-minify-html'),
	broswerSync = require('browser-sync'),
	reload = broswerSync.reload,
	del = require('del'),
	bower = require('gulp-bower'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	minifycss = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-ruby-sass'),
	htmlReplace = require('gulp-html-replace'),

	// Image pluglins
	changed = require('gulp-changed'),
	imagemin = require('gulp-imagemin');


/////////////////////////////////////
// JS Hint Task
/////////////////////////////////////

gulp.task('jshint', function() {
	gulp.src('public/assets/js/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(reload({stream:true}));
});

gulp.task('build:jshint', function() {
	gulp.src('public/assets/js/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});


/////////////////////////////////////
// Sass task
/////////////////////////////////////

gulp.task('sass', function() {
	return sass('public/assets/scss/style.scss', {style: 'expanded'})
		.on('error', sass.logError)
		.pipe(gulp.dest('public/assets/css'))
		.pipe(reload({stream:true}));
});



/////////////////////////////////////
// Scripts taskk
/////////////////////////////////////
gulp.task('scripts', function() {
	return gulp.src('public/assets')
});



/////////////////////////////////////
// HTML task
/////////////////////////////////////
gulp.task('html', function() {
	gulp.src('public/**/*.html')
	.pipe(reload({stream:true}));
});



/////////////////////////////////////
// Browser sync task
/////////////////////////////////////

gulp.task('browser', function() {
	broswerSync({
		server: {
			baseDir: './public/'
		}
	});
});


/////////////////////////////////////
// Build tasks
/////////////////////////////////////

// Minify Scripts
gulp.task('build:scripts', ['jshint'], function() {
	gulp.src('public/assets/js/*.js')
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('build/assets/js'));
});


// Minify Styles
gulp.task('build:styles', ['sass'], function() {
	gulp.src('public/assets/css/**/*.css')
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest('build/assets/css'));
});

// HTML Replace
gulp.task('build:html', function() {
	gulp.src('public/**/*.html')
	.pipe(htmlReplace({
		'css' : 'assets/css/style.min.css',
		'js' : 'assets/js/main.min.js'
	}))
	.pipe(minifyHTML())
	.pipe(gulp.dest('build/'));
});

// Minify Images
gulp.task('build:imagemin', function() {
	var imgSrc = 'public/assets/img/**/*',
		imgDst = 'build/assets/images';

	gulp.src(imgSrc)
		.pipe(changed(imgDst))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDst));
});

//browser sync
gulp.task('browser', function() {
	broswerSync({
		server: {
			baseDir: './build/'
		}
	});
});

// Copy bower folder into build folder
gulp.task('bower', function() {
    return bower()
    .pipe(gulp.dest('build/bower_components'))
});

// TODO: delete build folder before build runs
gulp.task('clean', function(cb) {
    del(['build'], cb);
});

/////////////////////////////////////
// Watch tasks
/////////////////////////////////////


gulp.task('watch', function() {
	gulp.watch('public/assets/js/**/*.js', ['jshint']);
	gulp.watch('public/assets/scss/**/*.scss', ['sass']);
	gulp.watch('public/**/*.html', ['html']);
});


/////////////////////////////////////
// Task runners
/////////////////////////////////////

gulp.task('default', ['jshint', 'watch', 'sass', 'scripts', 'html', 'browser']);

gulp.task('build', ['build:jshint', 'build:imagemin', 'build:scripts', 'build:html', 'build:styles', 'bower', 'browser']);