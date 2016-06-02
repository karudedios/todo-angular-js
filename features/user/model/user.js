const crypto    = require('crypto');
const mongoose  = require('mongoose');

const Schema    = mongoose.Schema;

const encryptPassword = (pass, salt) => crypto.pbkdf2Sync(pass, salt, 10000, 512).toString('base64');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  
  password: {
    type: String,
    required: true
  },
  
  salt: {
    type: String,
    default: ''
  }
});

UserSchema.pre('save', function(next) {
  this.salt = crypto.randomBytes(128).toString('base64');
  this.password = encryptPassword(this.password, this.salt);
  
  next();
});

UserSchema.statics.encryptPassword = encryptPassword;

module.exports = mongoose.model('User', UserSchema);
