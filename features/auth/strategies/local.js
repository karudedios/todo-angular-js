const Strategy  = require('passport-local');
const UserDto   = require('../../user/model/dto');
const FindUser  = require('../../user/services/findUser');

module.exports = class LocalAuthenticationStrategy {
  constructor(User, passport) {
    Object.assign(this, { passport });
    
    this.passport.use('local', new Strategy({
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      new FindUser(User)
        .findOne({ username })
        .then(user => {
          const encryptedPass = User.encryptPassword(password, user.salt);
          
          if (encryptedPass !== user.password) {
            throw  "Passwords don't match";
          } else {
            return UserDto.new(user);
          }
        })
        .then(done.bind(null, null))
        .catch(done);
    }));
    
    this.passport.serializeUser((user, done) => {
      done(null, user._id);
    });
    
    this.passport.deserializeUser((_id, done) => {
      new FindUser(User)
        .findOne({ _id })
        .then(UserDto.new)
        .then(done.bind(null, null))
        .catch(done);
    });
    
    this.authenticate = (req, res, next) =>
      this.passport.authenticate('local', (err, user) => {
        if (err) {
          return res.status(400).send(err.message);
        }
        
        req.login(user, (err) => {
          if (err) {
            return res.status(500).send(err);
          }
          
          return res.status(200).send(user);
        });
      })(req, res, next);
  }
  
  unauthenticated(req, res, next) {
    if (req.user) {
      return res.status(403).send("Cannot access this route while being authenticated");
    }
    
    return next();
  }
  
  authenticated(req, res, next) {
    if (!req.user) {
      return res.status(401).send("You're not authorized to enter this route");
    }
    
    return next();
  }
};
