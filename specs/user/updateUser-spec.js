const chai          = require('chai');
const DatabaseMock  = require('../helpers/databaseMock');
const User          = require('../../features/user/model/user');
const UpdateUser    =  require('../../features/user/services/updateUser');
const CreateUser    =  require('../../features/user/services/createUser');

describe('update user', () => {
  let _user = {};
  
  const db = new DatabaseMock();
  
  before((done) => {
    chai.should();
    db.connect();
    
    const createUser =new CreateUser(User);
    
    createUser.create({ username: "new user", password: "123456" })
      .then(newUser => {
        _user = newUser;
        done();
      }).catch(done);
  });
  
  after((done) => {
    db.clearDb(function() {
      db.disconnect();
      done();
    });
  });
  
  it('should ask for the dependencies it needs', () => {
    UpdateUser.length.should.equal(1);
    (() => new UpdateUser(User)).should.not.throw();
  });
  
  it('should gracefully fail if user._id is not provided', () => {
    return new UpdateUser(User)
      .update(undefined, { })
      .catch(err => {
        err.message.should.contain('"user._id" is required');
      });
  });
  
  it('should gracefully fail if user._id is not valid', () => {
    const oid = new Array(23).fill('0').join('');
    
    return new UpdateUser(User)
      .update(oid, {})
      .catch(err => {
        err.message.should.contain('"user._id" length must be 24 characters long');
      });
  });
  
  it('should gracefully fail if nothing is provided to update', () => {
    return new UpdateUser(User)
      .update(_user._id, { })
      .catch(err => {
        err.message.should.contain('"user" must have at least 1 children');
      });
  });
  
  it('should update a user if .update is called', () => {
    const seed = { username: 'josefo' };
    
    return new UpdateUser(User)
      .update(_user._id, seed)
      .then(user => {
        String(user._id).should.equal(String(user._id));
        user.username.should.equal(seed.username);
      });
  });
});