'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
 
gulp.task('sass', function () {
	gulp.src('./sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'));
	gulp.run('autoprefixer');
});

gulp.task('autoprefixer', function () {
	gulp.src('./css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'))
});

gulp.task('default', function(){
	gulp.run('sass');

	gulp.watch('./sass/**/*.scss', ['sass']);
});