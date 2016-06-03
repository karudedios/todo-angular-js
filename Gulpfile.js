"use strict";

const path      = require('path');
const gulp      = require('gulp');
const _         = require('lodash');
const env       = require('gulp-env');
const mocha     = require('gulp-mocha');
const rename    = require('gulp-rename');
const jshint    = require('gulp-jshint');
const plumber   = require('gulp-plumber');
const transform = require('gulp-transform');

const buildFeaturePath = _.partial(path.join.bind(path, '.', 'features', '**'), _, '*.js');

const modelPath     = buildFeaturePath('model');
const servicesPath  = buildFeaturePath('services');
const specsPath = path.join('.', 'specs', '**', '*-spec.js');

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

gulp.task('run:spec', () => {
  const mochaRunner = mocha({ reporter: 'min' });
  const environment = env({ file: '.config-spec.json' });
  
  return gulp.src(specsPath)
    .pipe(plumber())
    .pipe(environment)
    .pipe(mochaRunner)
    .pipe(environment.reset);
});

gulp.task('run:lint', () => {
  const environment = env({ file: '.config-spec.json' });
  
  return gulp.src([specsPath, modelPath, servicesPath])
    .pipe(environment)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(environment.reset);
});

gulp.task('run', ['make:config', 'run:lint', 'run:spec']);

gulp.task('watch:features', () => {
  return gulp.watch([specsPath, servicesPath, modelPath], ['run']);
});

gulp.task('default', ['run']);
