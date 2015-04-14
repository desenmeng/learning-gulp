/**
 * learning-gulp - gulpfile.js
 * Created by mengdesen on 15/4/14.
 * Last modified by nieweidong on 2015/04/15
 */

'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var shrink = require('gulp-cssshrink');

// 静态文件打包合并
var webpack = require('gulp-webpack');
// 上传七牛sdn
var qn = require('gulp-qn');
// MD5戳
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var revReplace = require("gulp-rev-replace");

var config = require('./webpack.config');
var qiniu = {
  accessKey: '6sBCo463jJOCnBIYX__uy9avZ7C2hj_MHb-ffKAr',
  secretKey: '3vPk7fB0HcwL5V9E2AErHuR19HM389eYqdvQcncL',
  bucket: 'xdemo',
  domain: 'http://7xik9a.com1.z0.glb.clouddn.com'
};

gulp.task('js', function () {
  gulp.src('./js')
    .pipe(webpack(config))
    .pipe(gulp.dest('./build'));
});
gulp.task('css', function () {
  gulp.src(['./css/main.css', './css/view.css'])
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./build'));
});

gulp.task('publish-js', function () {
  gulp.src(['./js'])
    .pipe(webpack(config))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./build'))
    .pipe(qn({
      qiniu: qiniu,
      prefix: 'gmap'
    }))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./build/rev/js'));
});
gulp.task('publish-css', function () {
   gulp.src(['./css/main.css', './css/view.css'])
    .pipe(concat('app.css'))
    .pipe(shrink())
    .pipe(rev())
    .pipe(gulp.dest('./build'))
    .pipe(qn({
      qiniu: qiniu,
      prefix: 'gmap'
    }))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./build/rev/css'));
});
gulp.task('publish-html', function () {
  gulp.src(['./build/rev/**/*.json', './index.html'])
    .pipe(revCollector({
      dirReplacements: {
        'build/': ''
      }
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
  gulp.watch('./css/*.css', ['css']);
  gulp.watch('./js/*.js', ['js']);
});
gulp.task('publish', ['publish-css','publish-js','publish-html']);
