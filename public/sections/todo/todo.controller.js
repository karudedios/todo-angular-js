angular.module('todoApp')
    .controller('TodoController', ['$scope', 'TodoService', TodoController]);

function TodoController($scope, TodoService) {
    var self = this;

    TodoService.findAll(function(todos){
       self.todos =  todos;
    });
}

