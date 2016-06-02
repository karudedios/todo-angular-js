const chai          = require('chai');
const DatabaseMock  = require('../helpers/databaseMock');
const Todo          = require('../../features/todo/model/todo');
const CreateTodo    =  require('../../features/todo/services/createTodo');

describe('create todo', () => {
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
    CreateTodo.length.should.equal(1);
    (() => new CreateTodo(Todo)).should.not.throw();
  });
  
  it('should gracefully fail if required fields are invalid', () => {
    return new CreateTodo(Todo)
      .create({ name: 5 })
      .catch(err => {
        err.message.should.contain('"todo.name" must be a string');
      });
  });
  
  it('should gracefully fail if required fields are not provided', () => {
    return new CreateTodo(Todo)
      .create({ })
      .catch(err => {
        err.message.should.contain('"todo.name" is required');
      });
  });
  
  it('should perform the creation when .create is called', () => {
    const name = 'Write a book';
    
    return new CreateTodo(Todo)
      .create({ name })
      .then(todo => {
        todo._id.should.not.equal(undefined);
        todo.name.should.equal(name);
      });
  });
});
