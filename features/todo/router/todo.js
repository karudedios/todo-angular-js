const _                 = require('lodash');
const TodoDto           = require('../model/dto');
const Router            = require('express').Router;
const FindTodo          = require('../services/findTodo');
const CreateTodo        = require('../services/createTodo');
const UpdateTodo        = require('../services/updateTodo');
const DeleteTodo        = require('../services/deleteTodo');
const PromisedResponse  = require('../../../utils/promisedResponse');

module.exports = (Todo, strategy) =>
  new Router()
    .get('/', strategy.authenticated, PromisedResponse((req) =>
      new FindTodo(Todo)
        .find({ owner: req.user._id })
        .then(TodoDto.newList)))

    .get('/:id', strategy.authenticated, PromisedResponse(req =>
      new FindTodo(Todo)
        .findOne({ _id: req.params.id, owner: req.user._id })
        .then(TodoDto.new)))

    .put('/:id', strategy.authenticated, PromisedResponse(req =>
      new UpdateTodo(Todo)
        .update(req.params.id, req.body)
        .then(TodoDto.new)))

    .post('/', strategy.authenticated, PromisedResponse(req =>
      new CreateTodo(Todo)
        .create(_.assign({ owner: req.user._id }, req.body))
        .then(TodoDto.new)))

    .delete('/:id', strategy.authenticated, PromisedResponse(req =>
      new DeleteTodo(Todo)
        .delete(req.params.id)
        .then(TodoDto.new)));
