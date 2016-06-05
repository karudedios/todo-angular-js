const Router = require('express').Router;

module.exports = (Todo, User) =>
  new Router()
    .use('/api', new Router()
      .use('/todo', require('../features/todo/router/todo')(Todo))
      .use('/user', require('../features/user/router/user')(User)));
