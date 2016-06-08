'use strict';
const Router            = require('express').Router;

module.exports = (User, strategy) =>
  new Router()
    .get('/me', strategy.authenticated, strategy.sessionUser)

    .post('/signup', strategy.unauthenticated, strategy.signup)

    .post('/signin', strategy.unauthenticated, strategy.authenticate)

    .post('/signout', strategy.authenticated, strategy.signout);
