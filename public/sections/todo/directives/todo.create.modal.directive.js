angular.module('todoApp')
    .directive('myTodoCreateModal', myTodoCreateModal)
    .directive('myTodoCreateModalBtn', myTodoCreateModalBtn);

function myTodoCreateModal(){
    return {
        scope : {
            todoModalId : '@',
            onSuccess : '&'
        },
        templateUrl : 'sections/todo/directives/todo.create.modal.html',
        controller : ['$scope', 'Todo', myTodoCreateModalController]
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
        controller : ['$scope', myTodoCreateModalBtnController]
    }
}

function myTodoCreateModalBtnController($scope){
    $scope.openModal = openModal;

    function openModal(){
        $('#' + $scope.todoModalId).openModal();
    }
}

function myTodoCreateModalController($scope, Todo){
    angular.element(document).ready(function () {
        initMaterializeDesign()
    });

    $scope.create = create;

    $scope.todo = {
        name : ''
    };

    function refreshTodo(){
        $scope.todo.name = '';
    }

    function create(){
        console.log($scope.todo)
        Todo.save($scope.todo, function(data){
            console.log(data);
            $scope.onSuccess(data);
            refreshTodo();
        }, function(err){
            console.log(err);
        });
    }

}

function initMaterializeDesign(){
    $('textarea#icon_prefix2').characterCounter();
    $('select').material_select();
}