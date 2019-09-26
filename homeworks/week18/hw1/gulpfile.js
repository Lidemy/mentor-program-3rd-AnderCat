const gulp = require('gulp');
const { parallel, src } = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

function css() {
  return src('./style.scss')
    .pipe(sass())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./build'));
}

function js() {
  return src('./index.js')
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build'));
}

exports.css = css;
exports.js = js;
exports.default = parallel(css, js);
