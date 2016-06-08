const chai          = require('chai');
const DatabaseMock  = require('../helpers/databaseMock');
const Todo          = require('../../features/todo/model/todo');
//const User          = require('../../features/user/model/user');
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

  it('should gracefully fail if name is not provided', () => {
    return new CreateTodo(Todo)
      .create({ owner: new Array(24).fill('0').join('') })
      .catch(err => {
        err.message.should.contain('"todo.name" is required');
      });
  });

  it('should gracefully fail if owner is not provided', () => {
    return new CreateTodo(Todo)
      .create({ name: 'Some name' })
      .catch(err => {
        err.message.should.contain('"todo.owner" is required');
      });
  });

  it('should gracefully fail if required fields are invalid', () => {
    return new CreateTodo(Todo)
      .create({ name: 5, owner: '' })
      .catch(err => {
        err.message.should.contain('"todo.name" must be a string');
      });
  });

  it('should perform the creation when .create is called', () => {
    const name = 'Write a book';

    return new CreateTodo(Todo)
      .create({ name, owner: new Array(24).fill('0').join('') })
      .then(todo => {
        todo._id.should.not.equal(undefined);
        todo.name.should.equal(name);
      });
  });
});
