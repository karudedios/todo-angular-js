angular.module('todoApp')
    .directive('myTodoCreateModal', myTodoCreateModal)
    .directive('myTodoCreateModalBtn', myTodoCreateModalBtn);

function myTodoCreateModal(){
    return {
        scope : {
            todoModalId : '@',
            onSuccess : '&'
        },
        templateUrl : 'sections/todo/directives/create/todo.create.modal.html',
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
        templateUrl : 'sections/todo/directives/create/todo.create.modal.btn.html',
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
            $scope.onSuccess(data);
            refreshTodo();
            Materialize.toast('The Task was created succesful !', 4000)
        }, function(err){
            Materialize.toast('There was an Error: ' + err, 4000);
        });
    }

}

function initMaterializeDesign(){
    $('textarea#icon_prefix2').characterCounter();
    $('select').material_select();
}