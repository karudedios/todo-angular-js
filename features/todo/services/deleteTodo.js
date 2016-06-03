'use strict';

const Q   = require('q');
const validateSchema  = require('../../../utils/validateSchema');
const objectIdSchema  = require('../../../utils/objectIdSchema');

const _idSchema = objectIdSchema.required().label('todo._id');

module.exports = class DeleteTodo {
  constructor(Todo) {
    Object.assign(this, { Todo });
  }
  
  delete(_id) {
    return Q.when()
      .then(validateSchema(_idSchema, _id))
      .then(() => {
        return Q.ninvoke(this.Todo, 'findOneAndRemove', { _id });
      });
  }
};
