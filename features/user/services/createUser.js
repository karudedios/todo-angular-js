const Q               = require('q');
const Joi             = require('joi');
const UserDto         = require('../model/dto');
const validateSchema  = require('../../../utils/validateSchema');

const userSchema = Joi.object().keys({
  username: Joi.string().required().label('user.username'),
  password: Joi.string().required().label('user.password')
}).required().label('user');

module.exports = class CreateUser {
  constructor(User) {
    Object.assign(this, { User });
  }
  
  create(user) {
    return Q.when()
      .then(validateSchema(userSchema, user))
      .then(() => {
        return Q.ninvoke(this.User, 'create', user);
      })
      .then(UserDto.new);
  }
};
