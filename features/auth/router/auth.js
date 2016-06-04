const Router            = require('express').Router;
const CreateUser        = require('../../user/services/createUser');
const PromisedResponse  = require('../../../utils/promisedResponse');

const LocalAuthenticationStrategy = require('../strategies/local');

module.exports = (User, passport) => {
  const strategy = new LocalAuthenticationStrategy(User, passport);
  
  return new Router()
    .get('/me', strategy.authenticated, (req, res) =>
      res.status(200).json(req.user))
  
    .post('/signup', strategy.unauthenticated, PromisedResponse((req, res, next) => {
      return new CreateUser(User)
        .create(req.body)
        .then(strategy.authenticate.bind(null, req, res, next))
        .then(res.status.bind(null, 200));
    }))
    
    .post('/signin', strategy.unauthenticated, strategy.authenticate)
    
    .post('/signout', strategy.authenticated, req => {
      req.signout(); 
    });
};
