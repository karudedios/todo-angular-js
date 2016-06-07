angular.module('todoApp')
    .directive('myLoginSignupModal', myLoginSignupModal);

function myLoginSignupModal() {
    return {
        scope :{

        },
        templateUrl : 'login/directives/signup/login.signup.modal.html',
        controller: ['$scope', 'Auth', myLoginSignupModalController]
    }
}

function myLoginSignupModalController($scope, Auth) {
    $scope.openModal = openModal;
    $scope.signUpUser = signUpUser;

    initNewUser();

    function signUpUser() {
        Auth.signup({username : $scope.user.username, password : $scope.user.password}, function(doc){
            console.log(doc)
        }, function(err){
            if(err.data){
                Materialize.toast(err.data, 3000);
            }
        });

        initNewUser();
    }

    function openModal() {
        $('#signUpModal').openModal();
    }

    function initNewUser(){
        $scope.user = {
            username: '',
            password: '',
            confirmation: ''
        };
    }
}