const TodoDto           = require('../model/dto');
const Router            = require('express').Router;
const FindTodo          = require('../services/findTodo');
const CreateTodo        = require('../services/createTodo');
const UpdateTodo        = require('../services/updateTodo');
const DeleteTodo        = require('../services/deleteTodo');
const PromisedResponse  = require('../../../utils/promisedResponse');

module.exports = (Todo) =>
  new Router()
    .get('/', PromisedResponse(() =>
      new FindTodo(Todo)
        .find({ })
        .then(TodoDto.newList)))
      
    .get('/:id', PromisedResponse(req =>
      new FindTodo(Todo)
        .findOne({ _id: req.params.id })
        .then(TodoDto.new)))
      
    .put('/:id', PromisedResponse(req =>
      new UpdateTodo(Todo)
        .update(req.params.id, req.body)
        .then(TodoDto.new)))
      
    .post('/', PromisedResponse(req =>
      new CreateTodo(Todo)
        .create(req.body)
        .then(TodoDto.new)))
      
    .delete('/:id', PromisedResponse(req =>
      new DeleteTodo(Todo)
        .delete(req.params.id)
        .then(TodoDto.new)));
