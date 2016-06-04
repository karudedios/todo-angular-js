const UserDto           = require('../model/dto');
const Router            = require('express').Router;
const FindUser          = require('../services/findUser');
const CreateUser        = require('../services/createUser');
const UpdateUser        = require('../services/updateUser');
const PromisedResponse  = require('../../../utils/promisedResponse');

module.exports = (User) =>
  new Router()
    .get('/:id', PromisedResponse(req => 
      new FindUser(User)
        .findOne({ _id: req.params.id })
        .then(UserDto.new)))
    
    .post('/', PromisedResponse(req => 
      new CreateUser(User)
        .create(req.body)
        .then(UserDto.new)))
    
    .put('/:id', PromisedResponse(req => 
      new UpdateUser(User)
        .update(req.params.id, req.body)
        .then(UserDto.new)));
