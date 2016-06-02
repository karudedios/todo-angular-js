const Q   = require('q');
const Joi = require('joi');

const objectIdValidation = Joi.alternatives(Joi.object(), Joi.string().length(12)).required().label('todo._id');

module.exports = class DeleteTodo {
  constructor(Todo) {
    Object.assign(this, { Todo });
  }
  
  delete(objectId) {
    return Q.when(objectId)
      .then(oid => {
        const validation = objectIdValidation.validate(oid);
        
        if(validation.error) {
          throw validation.error;
        }
        
        return oid;
      })
      .then(oid => {
        return Q.ninvoke(this.Todo, 'findOneAndRemove', {
          _id: oid
        });
      });
  }
};
