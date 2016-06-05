angular.module('todoApp')
    .directive('myTodoEditColorModal', myTodoEditColorModal);

function myTodoEditColorModal() {
    return {
        scope : {
            editModalId : '@',
            myTodo : '='
        },
        templateUrl : 'sections/todo/directives/editcolor/todo.editcolor.modal.html',
        controller : ['$scope', 'Todo', 'Colors', myTodoEditColorModaController]
    }
}

function myTodoEditColorModaController($scope, Todo, Colors){
    $scope.colors = Colors;
    $scope.editColor = editColor;
    
    function editColor(color){
        var todo = $scope.myTodo;
        todo.color = color.colorCode;

        Todo.update(todo);
    }
}