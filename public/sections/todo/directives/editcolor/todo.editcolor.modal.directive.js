angular.module('todoApp')
    .directive('myTodoEditColorModal', myTodoEditColorModal);

function myTodoEditColorModal() {
    return {
        scope : {
            editColorModalId : '@',
            myTodo : '=',
            onSuccess : '&'
        },
        templateUrl : 'sections/todo/directives/editcolor/todo.editcolor.modal.html',
        controller : ['$scope', 'Todo', 'Colors', myTodoEditColorModaController]
    }
}

function myTodoEditColorModaController($scope, Todo, Colors){
    $scope.colors = Colors;
    $scope.editColor = editColor;
    
    function editColor(color){
        Todo.update({_id : $scope.myTodo._id, color : color.colorCode}, function(doc){
            if($scope.onSuccess){
                $scope.onSuccess(doc);
            }
            Materialize.toast('The Color was Updated for Task: ' + doc.name, 4000)
            closeModal();
        });

    }

    function closeModal(){
        $('#' + $scope.editColorModalId).closeModal();
    }
}