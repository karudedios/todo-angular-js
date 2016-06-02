const Router = require('express').Router;

module.exports = (Todo) => {
  const routers = new Router()
    .use('/todo', require('./features/todo/router/todo')(Todo));
  
  return new Router()
    .use('/api', routers);
};
