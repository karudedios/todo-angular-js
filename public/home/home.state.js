
angular.module('todoApp')
    .config(['$stateProvider', HomeStateConfig]);

function HomeStateConfig($stateProvider){
    $stateProvider.state('app.home',{
        parent : 'app',
        url : '/',
        templateUrl : 'home/home.html'
    });
}