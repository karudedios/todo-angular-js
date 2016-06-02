const Q               = require('q');
const Joi             = require('joi');
const validateSchema  = require('../../../utils/validateSchema');
const objectIdSchema  = require('../../../utils/objectIdSchema');

const predicateSchema = Joi.object().keys({
  _id: objectIdSchema.optional().label('predicate._id'),
  username: Joi.string().optional().label('predicate.username'),
  password: Joi.string().optional().label('predicate.password'),
}).required().label('predicate');

module.exports = class FindUser {
  constructor(User) {
    Object.assign(this, { User });
  }
  
  findOne(predicate) {
    return Q.when()
      .then(validateSchema(predicateSchema, predicate))
      .then(() => {
        return Q.ninvoke(this.User, 'findOne', predicate);
      });
  }
};
