"use strict";

const path      = require('path');
const gulp      = require('gulp');
const _         = require('lodash');
const env       = require('gulp-env');
const mocha     = require('gulp-mocha');
const rename    = require('gulp-rename');
const plumber   = require('gulp-plumber');
const transform = require('gulp-transform');

const specSrc = path.join('.', 'specs', '**', '*-spec.js');

gulp.task('make:config', () => {
  return gulp.src('./configs/.*')
    .pipe(transform(content => {
      const json = content
        .split('\n')
        .filter(str => str)
        .map(line => {
          const [ variable, value ] = line.match(/^export ([a-z_]+) ?= ?(.*)$/i).slice(1);
          return { [variable]: value };
        }).reduce(_.assign, process.env || {});
      
      return JSON.stringify(json);
    }, { encoding: 'utf8' }))
    .pipe(rename({
      extname: '.json'
    }))
    .pipe(gulp.dest(''));
});

gulp.task('run:spec', ['make:config'], () => {
  const mochaRunner = mocha({ reporter: 'nyan' });
  const environment = env({ file: '.config-spec.json' });
  
  return gulp.src(specSrc)
    .pipe(plumber())
    .pipe(environment)
    .pipe(mochaRunner)
    .pipe(environment.reset);
});

gulp.task('watch:features', () => {
  const buildFeaturePath = _.partial(path.join.bind(path, '.', 'features', '**'), _, '*.js');
  const specPath = path.join('.', 'specs', '**', '*-spec.js');
  
  const modelPath     = buildFeaturePath('model');
  const servicesPath  = buildFeaturePath('services');
  
  return gulp.watch([specPath, servicesPath, modelPath], ['run:spec']);
});
    
gulp.task('default', ['run:spec']);
