angular.module('todoApp')
    .directive('passwordVerify', passwordVerify);

function passwordVerify() {
    return {
        require: "ngModel",
        scope: {
            passwordVerify: '='
        },
        link: function (scope, element, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                var origin = scope.passwordVerify;
                if (origin != viewValue) {
                    ctrl.$setValidity("passwordVerify", false);
                    return undefined;
                } else {
                    ctrl.$setValidity("passwordVerify", true);
                    return viewValue;
                }
            });
        }
    };
}