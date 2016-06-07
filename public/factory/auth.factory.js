angular.module('todoApp')
    .factory('Auth', ['$resource', AuthFactory]);

function AuthFactory($resource) {
    return $resource('/auth', {},
        {
            signup: {
                method : 'POST',
                url : '/auth/signup'
            },
            me : {
                method: 'GET',
                url : '/auth/me'
            },
            signin : {
                method: 'POST',
                url : '/auth/signin',
            },
            signout: {
                method: 'POST',
                url: '/auth/signout'
            }
        });
}