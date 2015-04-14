/**
 * learning-gulp - gulpfile.js
 * Created by mengdesen on 15/4/14.
 */

'use strict';

var gulp = require('gulp');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var qn = require('gulp-qn');

var config = require('./webpack.config');
var qiniu = {
    accessKey: '6sBCo463jJOCnBIYX__uy9avZ7C2hj_MHb-ffKAr',
    secretKey: '3vPk7fB0HcwL5V9E2AErHuR19HM389eYqdvQcncL',
    bucket: 'xdemo',
    domain: 'http://7xik9a.com1.z0.glb.clouddn.com'
};

gulp.task('publish', function () {
    gulp.src('./index')
        .pipe(webpack(config))
        .pipe(uglify())
        .pipe(gulp.dest('./build'))
        .pipe(qn({
            qiniu: qiniu,
            prefix: 'gmap'
        }));
});

