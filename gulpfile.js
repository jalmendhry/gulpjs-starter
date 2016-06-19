var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	minifyHTML = require('gulp-minify-html'),
	broswerSync = require('browser-sync'),
	reload = broswerSync.reload,
	del = require('del'),
	concat = require('gulp-concat');
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	minifycss = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-ruby-sass'),
	htmlReplace = require('gulp-html-replace'),
	concatCss = require('gulp-concat-css'),
	del = require('del'),
	changed = require('gulp-changed'),
	imagemin = require('gulp-imagemin');

gulp.task('clean', function () {
    del.sync(['./build/**']);
});

//Move the Index file
gulp.task('move-index', function () {
	return gulp.src('./src/**/*.html')
		.pipe(rename({
		    dirname: "",
		  }))
		.pipe(gulp.dest('./build/'))
		.pipe(reload({stream:true}));
});

//watch other html files
gulp.task('html', function() {
	// looks in the components folder because of the structure of the files
	return gulp.src('./src/components/**/*.html')
		.pipe(rename({
		    dirname: "",
		  }))
		.pipe(gulp.dest('./build/'))
		.pipe(reload({stream:true}));
});

//Create compressed JS
gulp.task('scripts', function() {
	// Compile app.js first and then any modules..
	return gulp.src(['./src/app.js', './src/**/*-module.js', './src/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./build/assets/js/'))
		.pipe(reload({stream:true}));
});

//Compile Sass
gulp.task('sass', function () {
	return sass('./src/**/*.scss', {style: 'expanded'})
		.on('error', sass.logError)
		.pipe(concatCss('style.css'))
		.pipe(gulp.dest('build/assets/css'))
		.pipe(reload({stream:true}));
});

//Lint the JS
gulp.task('lint', function() {
	return gulp.src('./src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Browser sync
gulp.task('browser', function() {
	broswerSync({
		server: {
			baseDir: './build/'
		}
	});
});

// Copy bower folder into build folder
gulp.task('move-bower', function() {
	return gulp.src(['bower_components/**/*.js', 'bower_components/**/*.css', 'bower_components/**/*.eot', 
						'bower_components/**/*.woff', 'bower_components/**/*.svg', 'bower_components/**/*.ttf'], {
        base:'./bower_components/'
    })
    .pipe(gulp.dest('build/bower_components'));
});

//Watchers
gulp.task('watch', function() {
	//Watch for a sass change to recompile
	gulp.watch('./src/**/*.scss', ['sass']);

	//Watch for a JS change to re-concatenate
	gulp.watch('./src/**/*.js', ['scripts'])

	gulp.watch('./src/components/**/*.html', ['html']);

	//Watch for index.html changes
	gulp.watch('./src/index.html', ['move-index']);

	//Watch the build folder to refresh the express server
	gulp.watch('./build/**/*.css');
	gulp.watch('./build/**/*.js');
	gulp.watch('./build/**/*.html');
});

//Default tasks performed each save
gulp.task('default', ['move-bower', 'move-index', 'html', 'scripts', 'sass', 'lint', 'browser', 'watch'], function() {});