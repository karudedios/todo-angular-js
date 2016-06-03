angular.module('todoApp')
    .directive('myTodoCreateModal', myTodoCreateModal)
    .directive('myTodoCreateModalBtn', myTodoCreateModalBtn);

function myTodoCreateModal(){
    return {
        scope : {
            todoModalId : '@'
        },
        templateUrl : 'sections/todo/directives/todo.create.modal.html'
    }
}

function myTodoCreateModalBtn(){
    return {
        scope : {
            todoModalId : '@',
            classes : '@?'
        },
        transclude : true,
        templateUrl : 'sections/todo/directives/todo.create.modal.btn.html',
        controller : function($scope){
            $scope.openModal = function(){
                $('#' + $scope.todoModalId).openModal();
            }
        }
    }
}