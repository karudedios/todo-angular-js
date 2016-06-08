angular.module('todoApp',
    [
        'ui.router',
        'ngResource',
        'ui.materialize'
    ]).run(['$rootScope', 'Auth', '$state', AppRun]);

function AppRun($rootScope, Auth, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
        Auth.me(function (doc) {
            if(toState.name == 'login'){
                $state.go('app.home')
            }
        }, function (err) {
            $state.go('login')
        })
    })
}