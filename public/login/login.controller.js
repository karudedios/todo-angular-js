angular.module('todoApp')
    .controller('LoginController', ['$scope', LoginController]);

function LoginController($scope) {
    $scope.message = 'hello world';
}