angular.module('todoApp')
    .config(['$stateProvider', TodoStateConfig]);

function TodoStateConfig($stateProvider) {
    $stateProvider
        .state('app.todo', {
            url : '/todo',
            parent : 'app',
            templateUrl : 'sections/todo/todo.html',
            controller : 'TodoController as ctrl'

        });

}