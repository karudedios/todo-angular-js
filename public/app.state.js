
angular.module('todoApp')
    .config(['$stateProvider', '$urlRouterProvider', AppStateConfig]);

function AppStateConfig($stateProvider, $urlRouterProvider){
    $stateProvider.state('app',{
        abstract : true,
        views : {
            'header' : {
                templateUrl : 'layout/header.html',
                controller : 'HeaderController as ctrl'
            },
            'content' : {
                template : '<div class="container" ui-view></div>'
            }
        }
    });

    $urlRouterProvider.otherwise(function ($injector, $location) {
        var $state = $injector.get('$state');
        $state.go('app.home');
    });


}