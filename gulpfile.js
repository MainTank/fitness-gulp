'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var sass = require('gulp-sass');
var w3c = require('gulp-w3c-css');
var htmlhint = require('gulp-htmlhint');
var babel = require('gulp-babel');
var beautify = require('gulp-beautify');

//3 new package varaibles
var about = require('gulp-about');
var cssbeautify = require('gulp-cssbeautify');
var stripCssComments = require('gulp-strip-css-comments');



gulp.task('sass', function() {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('w3c', function(){
    gulp.src('./assets/css/*.css')
    .pipe(w3c())
    .pipe(gulp.dest('./assets/css/build'h));
});

gulp.task('babel', function(){
    gulp.src('./assets/js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./assets/js'))
});

gulp.task('beautify', function() {
    gulp.src('./assets/js/**/*.js')
      .pipe(beautify({indent_size: 2}))
      .pipe(gulp.dest('./assets/js'))
});

gulp.task('htmlhint', function(){
    gulp.src("/*.html")
    .pipe(htmlhint())
});

//creates an about .json file with details about this project
gulp.task('about', function () {
    return gulp.src('package.json')
        .pipe(about())
        .pipe(gulp.dest('./'));  
});

//beautifies all the css files within the css folder
gulp.task('cssbeautify', function() {
    return gulp.src('./assets/css/**/*.css')
        .pipe(cssbeautify())
        .pipe(gulp.dest('./assets/css/'));;
});
 
//removes all comments from the css files within the css folder
gulp.task('csscomments', function () {
    return gulp.src('./assets/css/**/*.css')
        .pipe(stripCssComments())
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('css', ['sass', 'w3c', 'cssbeautify']);
gulp.task('js', ['babel', 'beautify']);
gulp.task('html', ['htmlhint']);
gulp.task('default', ['css', 'js', 'html']);