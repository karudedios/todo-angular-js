const md5   = require('md5');
const User  = require('./user');

module.exports = class UserDto {
  constructor(user) {
    Object.assign(this, {
      _id: user._id,
      username: user.username,
      password: md5(user.password),
    });
  }
  
  static new(user) {
    return user instanceof User
      ? new UserDto(user)
      : user;
  }
};
