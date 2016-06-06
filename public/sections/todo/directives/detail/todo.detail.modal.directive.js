angular.module('todoApp')
    .directive('myTodoDetailModal', myTodoDetailModal);

function myTodoDetailModal() {
    return {
        scope: {
            detailModalId: '@',
            myTodoId: '=',
            onSuccess: '&'
        },
        templateUrl: 'sections/todo/directives/detail/todo.detail.modal.html',
        controller: ['$scope', 'Todo', 'Colors', myTodoDetailModalController]
    }
}

function myTodoDetailModalController($scope, Todo, Colors) {
    angular.element(document).ready(function () {
        initMaterializeDesign();
    });

    $scope.refreshSelectStyle = refreshSelectStyle;
    $scope.editTodo = editTodo;
    $scope.colors = Colors;

    $scope.$watch('myTodoId', function () {
        if ($scope.myTodoId) {
            Todo.get({id: $scope.myTodoId}, function (doc, err) {
                $scope.myTodo = doc;
            });
        }
    });

    function refreshSelectStyle($index) {
        if (++$index == $scope.colors.length) {
            $('select').material_select();
        }
    }

    function editTodo(){
        var todo = {
            _id : $scope.myTodo._id,
            name : $scope.myTodo.name,
            color : $scope.myTodo.color
        }

        if($scope.myTodo.desc){
            todo.desc = $scope.myTodo.desc;
        }
        Todo.update(todo, function(doc){
            if($scope.onSuccess){
                $scope.onSuccess();
            }
            Materialize.toast('The Task "' + doc.name + '" was updated succesful', 4000);
        })
    }

    function initMaterializeDesign() {
        $('textarea#icon_prefix2').characterCounter();
        $('select').material_select();
    }
}

