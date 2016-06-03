angular.module('todoApp')
    .controller('TodoController', ['$scope', 'Todo', TodoController]);

function TodoController($scope, Todo) {
    var self = this;

    var todos = Todo.query(function(){
       self.todos =  todos;
    });
}

