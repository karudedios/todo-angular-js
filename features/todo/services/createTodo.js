'use strict';

const Q               = require('q');
const Joi             = require('joi');
const validateSchema  = require('../../../utils/validateSchema');
const objectIdSchema  = require('../../../utils/objectIdSchema');

const todoSchema = Joi.object().keys({
  name: Joi.string().required().label('todo.name'),
  owner: objectIdSchema.required().label('todo.owner')
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
      });
  }
};
