'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var ghPages = require('gulp-gh-pages');
var imagemin = require('gulp-imagemin');
var del = require('del');
var htmlImport = require('gulp-html-import');

gulp.task('clean', function() {
	return del(['dist']);
});

gulp.task('import', function () {
	gulp.src('./components/index.html')
			.pipe(htmlImport('./components/'))
			.pipe(gulp.dest('')); 
})

gulp.task('html', ['clean', 'import'], function () {
	return gulp.src('./*.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('fonts', ['clean'], function () {
	return gulp.src('./fonts/**/*')
		.pipe(gulp.dest('./dist/fonts'));
});

gulp.task('images', ['clean'], function() {
	return gulp.src('./images/**/*')
		// Pass in options to the task 
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest('./dist/images'));
});

gulp.task('sass', function () {
	return gulp.src('./sass/**/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'));
});

gulp.task('autoprefixer', ['sass'], function () {
	return gulp.src('./css/**/*.css')
				.pipe(autoprefixer({
						browsers: ['last 3 versions'],
						cascade: false
				}))
				.pipe(gulp.dest('./css'))
});

gulp.task('cssdeploy', ['autoprefixer'], function () {
	return gulp.src('./css/**/*.css')
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('default', function(){
	gulp.run('import');
	gulp.run('sass');
	gulp.run('autoprefixer');

	gulp.watch('./sass/**/*.scss', ['sass','autoprefixer']);
});

gulp.task('deploy', ['clean', 'import', 'html', 'fonts', 'images', 'sass', 'autoprefixer', 'cssdeploy'], function () {
	return gulp.src("./dist/**/*")
		.pipe(ghPages())
});