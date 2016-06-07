angular.module('todoApp')
    .directive('myLoginSignupModal', myLoginSignupModal);

function myLoginSignupModal() {
    return {
        scope :{

        },
        templateUrl : 'login/directives/signup/login.signup.modal.html',
        controller: ['$scope', '$state', 'Auth', myLoginSignupModalController]
    }
}

function myLoginSignupModalController($scope, $state, Auth) {
    $scope.openModal = openModal;
    $scope.signUpUser = signUpUser;

    initNewUser();

    function signUpUser() {
        Auth.signup({username : $scope.user.username, password : $scope.user.password}, function(doc){
            if(doc.username){
                $state.go('app.home');
            }
        }, function(err){
            if(err.data){
                Materialize.toast(err.data, 4000);
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