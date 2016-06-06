angular.module('todoApp')
    .directive('myLoginSignupModal', myLoginSignupModal);

function myLoginSignupModal() {
    return {
        templateUrl : 'login/directives/signup/login.signup.modal.html',
        controller: ['$scope', 'User', myLoginSignupModalController]
    }
}

function myLoginSignupModalController($scope, User) {
    $scope.openModal = openModal;
    $scope.signUpUser = signUpUser;
    $scope.invalidPasswords = false;

    $scope.user = {
        username: '',
        password: '',
        confirmation: ''
    };
    
    $scope.isValidPassword = isValidPassword; 

    function signUpUser() {
        
    }

    function isValidPassword() {
        return $scope.user.password === $scope.user.confirmation;  
    }
    
    function openModal() {
        $('#signUpModal').openModal();
    }


}