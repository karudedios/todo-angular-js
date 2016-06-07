angular.module('todoApp')
    .controller('TodoController', ['$scope', 'Todo', TodoController]);

function TodoController($scope, Todo) {


    var self = this;

    self.refreshList = refreshList;
    self.openEditModal = openEditModal;
    self.openDetailModal = openDetailModal;

    refreshList();

    function refreshList(){
        var todos = Todo.query(function(){
            self.todos =  todos;
        });
    }

    function openEditModal(todo){
        $('#editModal').openModal();
        self.todoToEditColor = todo;
    }
    
    function openDetailModal(todo){
        $('#detailModal').openModal();
        self.todoToDetailId = todo._id;
    }

    
}



