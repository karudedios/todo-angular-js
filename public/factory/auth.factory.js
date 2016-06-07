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
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                method: 'POST',
                url : '/auth/signin',
                transformRequest: function (data, headersGetter) {
                    var str = [];
                    for (var d in data)
                        str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                    return str.join("&");
                }
            },
            signout: {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

                method: 'POST',
                url: '/auth/signout'
            }
        });
}