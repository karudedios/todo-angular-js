const chai          = require('chai');
const DatabaseMock  = require('../helpers/databaseMock');
const Todo          = require('../../features/todo/model/todo');
const UpdateTodo    =  require('../../features/todo/services/updateTodo');
const CreateTodo    =  require('../../features/todo/services/createTodo');

describe('update todo', () => {
  let todo = {};
  
  const db = new DatabaseMock();
  
  before((done) => {
    chai.should();
    db.connect();
    
    const createTodo =new CreateTodo(Todo);
    
    createTodo.create({ name: "new todo" })
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
    UpdateTodo.length.should.equal(1);
    (() => new UpdateTodo(Todo)).should.not.throw();
  });
  
  it('should fail gracefully if todo_id is not provided', () => {
    return new UpdateTodo(Todo)
      .update(undefined, { })
      .catch(err => {
        err.message.should.contain('"todo._id" is required')
      });
  });
  
  it('should fail gracefully if invalid todo_id is provided', () => {
    const oid = new Array(11).fill("0").join('');
    
    return new UpdateTodo(Todo)
      .update(oid, { })
      .catch(err => {
        err.message.should.contain('"todo._id" length must be 12 characters long')
      });
  });
  
  it('should fail gracefully if nothing is prrovided', () => {
    return new UpdateTodo(Todo)
      .update(todo._id, { })
      .catch(err => {
        err.message.should.contain('"todo" must have at least 1 children');
      });
  });
  
  it('should update todo if .update is called', () => {
    const newTodo = { name: 'new name', desc: 'new desc', color: '#000000' };
    
    return new UpdateTodo(Todo)
      .update(todo._id, newTodo)
      .then(updatedTodo => {
        String(updatedTodo._id).should.equal(String(todo._id));
        updatedTodo.name.should.equal(newTodo.name);
        updatedTodo.desc.should.equal(newTodo.desc);
        updatedTodo.color.should.equal(newTodo.color);
      });
  });
});
