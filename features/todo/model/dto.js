const Todo = require('./todo');

module.exports = class TodoDto {
  constructor(todo) {
    Object.assign(this, {
      _id: todo._id,
      name: todo.name,
      desc: todo.desc,
      color: todo.color
    });
  }
  
  static new(todo) {
    return todo instanceof Todo
      ? new TodoDto(todo)
      : null;
  }
  
  static newList(todos) {
    return todos.map(TodoDto.new);
  }
};
