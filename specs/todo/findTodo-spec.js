const chai          = require('chai');
const DatabaseMock  = require('../helpers/databaseMock');
const Todo          = require('../../features/todo/model/todo');
const FindTodo    =  require('../../features/todo/services/findTodo');
const CreateTodo    =  require('../../features/todo/services/createTodo');

describe('find todo', () => {
  let _todos = [];
  let firstTodo = {};
  let secondTodo = {};
  let should;
  
  const db = new DatabaseMock();
  
  before((done) => {
    should = chai.should();
    db.connect();
    
    const createTodo =new CreateTodo(Todo);
    
    createTodo.create({ name: 'first!' })
      .then(newTodo => {
        return createTodo.create({ name: 'second!' })
          .then(newerTodo => {
            _todos = [firstTodo, secondTodo] = [newTodo, newerTodo];
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
    FindTodo.length.should.equal(1);
    (() => new FindTodo(Todo)).should.not.throw();
  });
  
  describe('findOne', () => {
    it('should gracefully fail if invalid predicate is provided', () => {
      return new FindTodo(Todo)
        .findOne(undefined)
        .catch(err => {
          err.message.should.contain('"predicate" is required');
        });
    });
    
    it('should retrieve first todo if empty predicate is provided', () => {
      return new FindTodo(Todo)
        .findOne({ })
        .then(todo => {
          String(todo._id).should.equal(String(firstTodo._id));
        });
    });
    
    it('should retrieve first todo that matches a given predicate', () => {
      return new FindTodo(Todo)
        .findOne({ name: secondTodo.name })
        .then(todo => {
          String(todo._id).should.equal(String(secondTodo._id));
        });
    });
    
    it('should return null if nothing was found', () => {
      return new FindTodo(Todo)
        .findOne({ name: 'nope' })
        .then(todo => {
          should.not.exist(todo);
        });
    });
  });
  
  describe('find', () => {
    it('should gracefully fail if invalid predicate is provided', () => {
      return new FindTodo(Todo)
        .find(undefined)
        .catch(err => {
          err.message.should.contain('"predicate" is required');
        });
    });
    
    it('should retrieve all todos if empty predicate is provided', () => {
      return new FindTodo(Todo)
        .find({ })
        .then(todos => {
          todos.length.should.equal(_todos.length);
        });
    });
    
    it('should retrieve all todos matching a given predicate', () => {
      return new FindTodo(Todo)
        .find({ name: firstTodo.name })
        .then(todos => {
          todos.length.should.equal(1);
        });
    });
    
    it('should return an empty object if nothing was found', () => {
      return new FindTodo(Todo)
        .find({ name: 'nope' })
        .then(todos => {
          todos.should.deep.equal([]);
        });
    });
  });
});
