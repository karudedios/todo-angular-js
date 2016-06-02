const chai          = require('chai');
const DatabaseMock  = require('../helpers/databaseMock');
const User          = require('../../features/user/model/user');
const FindUser    =  require('../../features/user/services/findUser');

describe('find user', () => {
  let _users = [];
  
  const db = new DatabaseMock();
  
  before((done) => {
    chai.should();
    db.connect();
  });
  
  after((done) => {
    db.clearDb(function() {
      db.disconnect();
      done();
    });
  });
});