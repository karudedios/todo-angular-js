angular.module('todoApp')
    .controller('TodoController', ['$scope', 'Todo', TodoController]);

function TodoController($scope, Todo) {
    var self = this;

    self.refreshList = refreshList;

    refreshList();

    function refreshList(){
        var todos = Todo.query(function(){
            self.todos =  todos;
        });
    }
}

