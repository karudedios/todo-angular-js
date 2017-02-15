angular.module('todoApp')
    .factory('User', ['$resource', User]);

function User($resource){
    return $resource('/api/user/:id');
}