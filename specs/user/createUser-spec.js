const chai          = require('chai');
const DatabaseMock  = require('../helpers/databaseMock');
const User          = require('../../features/user/model/user');
const CreateUser    =  require('../../features/user/services/createUser');

describe('create user', () => {
  const db = new DatabaseMock();
  
  before(() => {
    chai.should();
    db.connect();
  });
  
  after((done) => {
    db.clearDb(function() {
      db.disconnect();
      done();
    });
  });
  
  it('should ask for the dependencies it needs', () => {
    CreateUser.length.should.equal(1);
    (() => new CreateUser(User)).should.not.throw();
  });

  it('should gracefully fail if nothing is provied', () => {
    return new CreateUser(User)
      .create()
      .catch(err => {
        err.message.should.contain('"user" is required');
      });
  });

  it('should gracefully fail if username is not provided', () => {
    return new CreateUser(User)
      .create({ password: '1234' })
      .catch(err => {
        err.message.should.contain('"user.username" is required');
      });
  });
  
  it('should gracefully fail if password is not provided', () => {
    return new CreateUser(User)
      .create({ username: "someuser" })
      .catch(err => {
        err.message.should.contain('"user.password" is required');
      });
  });
  
  it('should gracefully fail if invalid data-type is provided for username', () => {
    return new CreateUser(User)
      .create({ username: 10, password: 'papolo' })
      .catch(err => {
        err.message.should.contain('"user.username" must be a string');
      });
  });
  
  it('should gracefully fail if invalid data-type is provided for password', () => {
    return new CreateUser(User)
      .create({ username: 'papolo', password: 5 })
      .catch(err => {
        err.message.should.contain('"user.password" must be a string');
      });
  });
  
  it('should create a user if .create is called', () => {
    const seed = { username: 'batida', password: 'semato' };
    return new CreateUser(User)
      .create(seed)
      .then(user => {
        const encryptedPassword = User.encryptPassword(seed.password, user.salt);
        
        user._id.should.not.equal(undefined);
        user.username.should.equal(seed.username);
        user.password.should.equal(encryptedPassword);
      });
  });
});