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
        controller: ['$scope', 'Todo', myTodoDetailModalController]
    }
}

function myTodoDetailModalController($scope, Todo) {
    angular.element(document).ready(function () {
        initMaterializeDesign();
    });

    $scope.editTodo = editTodo;

    $scope.$watch('myTodoId', function () {
        if ($scope.myTodoId) {
            Todo.get({id: $scope.myTodoId}, function (doc, err) {
                $scope.myTodo = doc;
            });
        }
    });

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
        $('#colorpickerField1').colorpicker().on('changeColor.colorpicker', function(event){
            $scope.myTodo.color = event.color.toHex();
        });
    }
}

