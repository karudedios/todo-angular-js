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
        controller : ['$scope', 'Todo', myTodoEditColorModaController]
    }
}

function myTodoEditColorModaController($scope, Todo){
    angular.element(document).ready(function () {
        initMaterializeDesign();
    });

    $scope.editColor = editColor;
    
    function editColor(){
        Todo.update({_id : $scope.myTodo._id, color : $scope.myTodo.color}, function(doc){
            if($scope.onSuccess){
                $scope.onSuccess(doc);
            }
            Materialize.toast('The Color was Updated for Task: ' + doc.name, 4000)
            closeModal();
        }, handleError);
    }

    function closeModal(){
        $('#' + $scope.editColorModalId).closeModal();
    }

    function initMaterializeDesign() {
        $('#colorPickerEdit').colorpicker().on('changeColor.colorpicker', function(event){
            $scope.myTodo.color = event.color.toHex();
        });
    }
}