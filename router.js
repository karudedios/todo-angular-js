const Router = require('express').Router;

module.exports = (Todo, User, passport) =>
  new Router()
    .use('/api', new Router()
      .use('/todo', require('./features/todo/router/todo')(Todo))
      .use('/user', require('./features/user/router/user')(User))
      .use('/auth', require('./features/auth/router/auth')(User, passport)));
