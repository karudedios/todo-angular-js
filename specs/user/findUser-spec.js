const chai          = require('chai');
const DatabaseMock  = require('../helpers/databaseMock');
const User          = require('../../features/user/model/user');
const FindUser      =  require('../../features/user/services/findUser');
const CreateUser    =  require('../../features/user/services/createUser');

describe('find user', () => {
  let firstUser = {};
  let secondUser = {};
  let should;
  
  const db = new DatabaseMock();
  
  before((done) => {
    should = chai.should();
    db.connect();
    
    const createUser = new CreateUser(User);
    createUser.create({ username: 'first', password: 'firstPass' })
      .then(_firstUser => {
        return createUser.create({ username: 'second', password: 'secondPassword' })
          .then(_secondUser => {
            [firstUser, secondUser] = [_firstUser, _secondUser];
            done();
          });
      });
  });
  
  after((done) => {
    db.clearDb(function() {
      db.disconnect();
      done();
    });
  });
  
  it('should ask for the dependencies it needs', () => {
    FindUser.length.should.equal(1);
    (() => new FindUser(User)).should.not.throw();
  });
  
  describe('findOne', () => {
    it('should gracefully fail if invalid predicate is provided', () => {
      return new FindUser(User)
        .findOne(undefined)
        .catch(err => {
          err.message.should.contain('"predicate" is required');
        });
    });
    
    it('should retrieve first user if predicate is empty', () => {
      return new FindUser(User)
        .findOne({ })
        .then(user => {
          String(user._id).should.equal(String(firstUser._id));
        });
    });
    
    it('should return null if no user is found', () => {
      return new FindUser(User)
        .findOne({ username: 'crap' })
        .then(user => {
          should.not.exist(user);
        });
    });
    
    it('should retrieve first matching user if predicate is given', () => {
      return new FindUser(User)
        .findOne({ username: secondUser.username })
        .then(user => {
          String(user._id).should.equal(String(secondUser._id));
        });
    });
  });
});
