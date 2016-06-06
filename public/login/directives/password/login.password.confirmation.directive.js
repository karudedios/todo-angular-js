angular.module('todoApp')
    .directive('myConfirmPassword', myConfirmPassword);

function myConfirmPassword() {
    return{
        require:'ngModel',
        link: function(scope, elem, attrs, ctrl){
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.user.password.$viewValue
                ctrl.$setValidity('noMatch', noMatch);
            })
        }
    }
}