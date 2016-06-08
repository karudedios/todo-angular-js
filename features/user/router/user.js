const UserDto           = require('../model/dto');
const Router            = require('express').Router;
const FindUser          = require('../services/findUser');
const UpdateUser        = require('../services/updateUser');
const PromisedResponse  = require('../../../utils/promisedResponse');

module.exports = (User, strategy) =>
  new Router()
    .get('/:id', strategy.authenticated, PromisedResponse(req =>
      new FindUser(User)
        .findOne({ _id: req.params.id })
        .then(UserDto.new)))

    .put('/:id', strategy.authenticated, PromisedResponse(req =>
      new UpdateUser(User)
        .update(req.params.id, req.body)
        .then(UserDto.new)));
