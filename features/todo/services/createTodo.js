'use strict';

const Q               = require('q');
const Joi             = require('joi');
const TodoDto         = require('../model/dto');
const validateSchema  = require('../../../utils/validateSchema');

const todoSchema = Joi.object().keys({
  name: Joi.string().required().label('todo.name')
}).label('todo');

module.exports = class CreateTodo {
  constructor(Todo) {
    Object.assign(this, { Todo });
  }
  
  create(todo) {
    return Q.when(todo)
      .then(validateSchema(todoSchema, todo))
      .then(() => {
        return Q.ninvoke(this.Todo, 'create', todo);
      })
      .then(TodoDto.new);
  }
};
