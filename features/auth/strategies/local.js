'use strict';
const Strategy    = require('passport-local');
const UserDto     = require('../../user/model/dto');
const FindUser    = require('../../user/services/findUser');
const CreateUser  = require('../../user/services/createUser');

const logIn = function(req, res, user) {
  req.login(user, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(200).send(user);
  });
};

module.exports = class LocalAuthenticationStrategy {
  constructor(User, passport) {
    passport.use('local', new Strategy({
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

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser((_id, done) => {
      new FindUser(User)
        .findOne({ _id })
        .then(UserDto.new)
        .then(done.bind(null, null))
        .catch(done);
    });

    this.authenticate = (req, res, next) =>
      passport.authenticate('local', (err, user) => {
        if (err) {
          return res.status(400).send(err.message);
        }

        logIn(req, res, user);
      })(req, res, next);

    this.signup = (req, res) => {
      const createUser = new CreateUser(User);

      new FindUser(User)
        .findOne({ username: req.body.username })
        .then(user => {
          if (user) throw "Username exists";
          return req.body;
        })
        .then(createUser.create.bind(createUser))
        .then(UserDto.new)
        .then(logIn.bind(null, req, res))
        .catch(err => console.log(err) || res.status(400).send(err));
    };
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

  sessionUser(req, res) {
    return res.status(200).json(req.user);
  }

  signout(req, res) {
    req.logout();
    res.status(302).send("Logged out");
  }
};
