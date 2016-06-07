angular.module('todoApp')
    .factory('Auth', ['$resource', AuthFactory]);

function AuthFactory($resource) {
    return $resource('/auth', {},
        {
            signup: {
                method : 'POST',
                url : '/auth/signup'
            }
        });
}