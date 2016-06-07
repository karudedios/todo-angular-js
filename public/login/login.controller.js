angular.module('todoApp')
    .controller('LoginController', ['$scope', 'Auth', '$state', LoginController]);

function LoginController($scope, Auth, $state) {
    var self = this;
    
    self.signin = signin;
    self.user = {
        username: '',
        password: ''
    }

    function signin() {
        Auth.signin(self.user, function(doc){
            $state.go('app.home');
        }, function(err){
            if(err.data){
                Materialize.toast('Username or Password are incorrect', 4000);
            }
        })
    }
}