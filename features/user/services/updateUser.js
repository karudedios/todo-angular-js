const Q               = require('q');
const Joi             = require('joi');
const FindUser        = require('./findUser');
const validateSchema  = require('../../../utils/validateSchema');
const objectIdSchema  = require('../../../utils/objectIdSchema');

const _idSchema = objectIdSchema.required().label('user._id');

const userSchema = Joi.object().keys({
  username: Joi.string().optional().label('user.username'),
  password: Joi.string().optional().label('user.password'),
}).required().label('user');

module.exports = class UpdateUser {
  constructor(User) {
    Object.assign(this, { User });
  }
  
  update(_id, user) {
    return Q.when()
      .then(validateSchema(_idSchema, _id))
      .then(validateSchema(userSchema, user))
      .then(() => {
        return new Q.ninvoke(this.User, 'update', { _id }, user);
      })
      .then(() => {
        return new FindUser(this.User).findOne({ _id });
      });
  }
};
