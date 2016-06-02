const Q               = require('q');
const Joi             = require('joi');
const validateSchema  = require('../../../utils/validateSchema');
const objectIdSchema  = require('../../../utils/objectIdSchema');

const predicateSchema = Joi.object().keys({
  _id: objectIdSchema.optional().label('todo._id'),
  name: Joi.string().optional().label('todo.name'),
  desc: Joi.string().optional().label('todo.desc'),
  color: Joi.string().regex(/#[a-f0-9]{6}/i).optional().label('todo.color')
}).required().label('predicate');

module.exports = class FindTodo {
  constructor(Todo) {
    Object.assign(this, { Todo });
  }
  
  findOne(predicate) {
    return Q.when()
      .then(validateSchema(predicateSchema, predicate))
      .then(() => {
        return Q.ninvoke(this.Todo, 'findOne', predicate);
      });
  }
  
  find(predicate) {
    return Q.when()
      .then(validateSchema(predicateSchema, predicate))
      .then(() => {
        return Q.ninvoke(this.Todo, 'find', predicate);
      });
  }
};
