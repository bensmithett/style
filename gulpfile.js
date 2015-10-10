'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var merge = require('merge-stream')

var stylesheets = require('./stylesheets/index.gulp')

gulp.task('style', function () {
  var sassStream = gulp.src(stylesheets, {cwd: '.'})
    .pipe(
      sass({
        indentedSyntax: true,
        includePaths: ["./stylesheets"]
      }).on('error', sass.logError)
    )

  var cssStream = gulp.src('node_modules/sanitize.css/dist/sanitize.css')

  return merge(cssStream, sassStream)
    .pipe(concat('app.css'))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ]))
    .pipe(gulp.dest('./css'))
})
 
gulp.task('style:watch', function () {
  gulp.watch(stylesheets, ['style'])
})
