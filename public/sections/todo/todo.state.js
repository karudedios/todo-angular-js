angular.module('todoApp')
    .config(['$stateProvider', TodoStateConfig]);

function TodoStateConfig($stateProvider) {
    $stateProvider
        .state('app.todo', {
            url : '/todo',
            parent : 'app',
            controller : 'TodoController as ctrl',
            templateUrl : 'sections/todo/todo.html'
        });

}