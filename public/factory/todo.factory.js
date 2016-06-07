angular.module('todoApp')
    .factory('Todo', ['$resource', TodoFactory]);

function TodoFactory($resource){
    return $resource('/api/todo/:id',
        {id : '@_id'},
        {'update' : {method : 'PUT'}}
    );
}