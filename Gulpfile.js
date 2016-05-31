"use strict";

const path  = require('path');
const gulp  = require('gulp');
const env   = require('gulp-env');
const mocha = require('gulp-mocha');

const specSrc = path.join('.', 'specs', '**', '*-spec.js');

gulp.task('run:spec', () => {
  const mochaRunner = mocha({ reporter: 'dot' });
  const environment = env({ file: '.config-spec.json' });
    
  return gulp.src(specSrc)
    .pipe(environment)
    .pipe(mochaRunner)
    .pipe(environment.reset);
});

gulp.task('watch:spec', () => {
  return gulp.watch(specSrc, ['run:spec']);
});
    
gulp.task('default', ['run:spec']);
