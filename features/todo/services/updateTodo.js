'use strict';

const Q               = require('q');
const Joi             = require('joi');
const FindTodo        = require('./findTodo');
const validateSchema  = require('../../../utils/validateSchema');
const objectIdSchema  = require('../../../utils/objectIdSchema');

const _idSchema = objectIdSchema.required().label('todo._id');

const todoSchema = Joi.object().keys({
  name: Joi.string().label('todo.name'),
  desc: Joi.string().label('todo.desc'),
  color: Joi.string().regex(/#[a-f0-9]{6}/i).label('todo.color')
}).min(1).label('todo');

module.exports = class UpdateTodo {
  constructor(Todo) {
    Object.assign(this, { Todo });
  }
  
  update(_id, todo) {
    return Q.when()
      .then(validateSchema(_idSchema, _id))
      .then(validateSchema(todoSchema, todo))
      .then(() => {
        return Q.ninvoke(this.Todo, 'update', { _id }, todo);
      })
      .then(() => {
        return new FindTodo(this.Todo).findOne({ _id });
      });
  }
};
