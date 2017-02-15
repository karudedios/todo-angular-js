angular.module('todoApp')
    .config(['$stateProvider', LoginStateConfig]);

function LoginStateConfig($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        views: {
            'content': {
                templateUrl: 'login/login.html',
                controller: 'LoginController as ctrl'
            }
        },
    });
}

