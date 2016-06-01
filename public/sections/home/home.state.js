
angular.module('todoApp')
    .config(['$stateProvider', HomeStateConfig]);

function HomeStateConfig($stateProvider){
    $stateProvider.state('app.home',{
        parent : 'app',
        url : '/',
        templateUrl : 'sections/home/home.html'
    });
}