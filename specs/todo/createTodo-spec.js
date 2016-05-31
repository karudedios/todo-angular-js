const chai          = require('chai');
const DatabaseMock  = require('../helpers/databaseMock');
const Todo          = require('../../features/todo/model/todo');
const CreateTodo    =  require('../../features/todo/services/createTodo');

describe("create todo", () => {
  before((done) => {
    new DatabaseMock().connect(done);
    chai.should();
  });
  
  it("should ask for the dependencies it needs", () => {
    CreateTodo.length.should.equal(1);
    (() => new CreateTodo(Todo)).should.not.throw();
  });
  
  it("should perform the creation when .create is called", () => {
    return new CreateTodo(Todo)
      .create({ name: "Write a book" })
      .then(todo => {
        todo._id.should.be.defined();
        todo.name.should.equal("Write a book");
      });
  });
});
