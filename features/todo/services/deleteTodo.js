const Q   = require('q');
const Joi = require('joi');
const validateSchema  = require('../../../utils/validateSchema');

const objectIdSchema = Joi.alternatives(Joi.object(), Joi.string().length(24)).required().label('todo._id');

module.exports = class DeleteTodo {
  constructor(Todo) {
    Object.assign(this, { Todo });
  }
  
  delete(_id) {
    return Q.when()
      .then(validateSchema(objectIdSchema, _id))
      .then(() => {
        return Q.ninvoke(this.Todo, 'findOneAndRemove', { _id });
      });
  }
};
