angular.module('todoApp')
    .controller('TodoController', ['$scope', TodoController]);

function TodoController($scope) {
    var self = this;

    self.todos = [
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
        }
    ]

}

