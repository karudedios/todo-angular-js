const Router = require('express').Router;

module.exports = (User, passport) =>
  new Router()
    .use('/auth', require('../features/auth/router/auth')(User, passport));
