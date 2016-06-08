angular.module('todoApp')
    .directive('myTodoCreateModal', myTodoCreateModal)
    .directive('myTodoCreateModalBtn', myTodoCreateModalBtn);

function myTodoCreateModal() {
    return {
        scope: {
            todoModalId: '@',
            onSuccess: '&'
        },
        templateUrl: 'sections/todo/directives/create/todo.create.modal.html',
        controller: ['$scope', 'Todo', myTodoCreateModalController]
    }
}

function myTodoCreateModalBtn() {
    return {
        scope: {
            todoModalId: '@',
            classes: '@?'
        },
        transclude: true,
        templateUrl: 'sections/todo/directives/create/todo.create.modal.btn.html',
        controller: ['$scope', myTodoCreateModalBtnController]
    }
}

function myTodoCreateModalBtnController($scope) {
    $scope.openModal = openModal;

    function openModal() {
        $('#' + $scope.todoModalId).openModal();
    }
}

function myTodoCreateModalController($scope, Todo) {

    $scope.create = create;

    $scope.todo = {
        name: ''
    };

    function refreshTodo() {
        $scope.todo.name = '';
    }

    function create() {
        var todo = $scope.todo;

        Todo.save(todo, function (data) {
            if ($scope.onSuccess) {
                $scope.onSuccess(data);
            }
            refreshTodo();
            Materialize.toast('The Task was created succesful !', 4000)
        }, handleError);
    }

    

}
