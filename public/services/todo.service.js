angular.module('todoApp')
    .service('TodoService', ['$http', TodoService]);

function TodoService($http){
    this.findAll = findAll;

    function findAll(cb){
        if(cb){

            //TODO: REPLACE THIS TO USE THE TODO'S API
            var todos = [
                {
                    name : 'Eat',
                    color : 'red'
                },
                {
                    name : 'Sleep',
                    color : 'blue'
                },
                {
                    name : 'Rave',
                    color : 'yellow'
                },
                {
                    name : 'Repeat',
                    color : 'green'
                },
                {
                    name : 'Repeat',
                    color : 'green'
                },
                {
                    name : 'Repeat',
                    color : 'green'
                },
                {
                    name : 'Repeat',
                    color : 'green'
                },
                {
                    name : 'Repeat',
                    color : 'green'
                },
                {
                    name : 'Repeat',
                    color : 'green'
                },
                {
                    name : 'Repeat',
                    color : 'green'
                },
                {
                    name : 'Repeat',
                    color : 'green'
                },
                {
                    name : 'Repeat',
                    color : 'green'
                }
            ];

            cb(todos);
        }
    }
}