const chai          = require('chai');
const DatabaseMock  = require('../helpers/databaseMock');
const Todo          = require('../../features/todo/model/todo');
const DeleteTodo    =  require('../../features/todo/services/deleteTodo');
const CreateTodo    =  require('../../features/todo/services/createTodo');

describe('delete todo', () => {
  let todo = {};
  
  const db = new DatabaseMock();
  
  before((done) => {
    chai.should();
    db.connect();
    
    const createTodo =new CreateTodo(Todo);
    
    createTodo.create({ name: "test" })
      .then(newTodo => {
        todo = newTodo;
        done();
      });
  });
  
  after((done) => {
    db.clearDb(function() {
      db.disconnect();
      done();
    });
  });
  
  it('should ask for the dependencies it needs', () => {
    DeleteTodo.length.should.equal(1);
    (() => new DeleteTodo(Todo)).should.not.throw();
  });
  
  it('should gracefully fail if invalid todo_id is provided', () => {
    return new DeleteTodo(Todo)
      .delete(15)
      .catch(err => {
        err.message.should.contain('"todo._id" must be a string');
      });
  });
  
  it('should gracefully fail if non 12-byte todo_id is provided', () => {
    const oId = new Array(11).fill("0").join('');
    
    return new DeleteTodo(Todo)
      .delete(oId)
      .catch(err => {
        err.message.should.contain('"todo._id" length must be 12 characters long');
      });
  });
  
  it('should gracefully fail if todo_id is not provided', () => {
    return new DeleteTodo(Todo)
      .delete()
      .catch(err => {
        err.message.should.contain('"todo._id" is required');
      });
  });
  
  it('should delete a todo if .delete is called', () => {
    return new DeleteTodo(Todo)
      .delete(todo._id)
      .then((deletedTodo) => {
        String(deletedTodo._id).should.equal(String(todo._id));
      });
  });
});
