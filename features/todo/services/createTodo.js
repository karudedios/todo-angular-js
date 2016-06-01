const Q   = require('q');
const Joi = require('joi');

const todoValidation = Joi.object().keys({
  name: Joi.string().required().label('todo.name')
}).label('todo');

module.exports = class CreateTodo {
  constructor(Todo) {
    Object.assign(this, { Todo });
  }
  
  create(source) {
    return Q.when(source)
      .then(source => {
        const validation = todoValidation.validate(source);
        
        if (validation.error) {
          throw validation.error;
        }
        
        return source;
      })
      .then(todo => {
        return Q.ninvoke(this.Todo, 'create', todo);
      });
  }
};
