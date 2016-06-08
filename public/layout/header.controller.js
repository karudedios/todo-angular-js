angular.module('todoApp')
.controller('HeaderController', ['$scope', 'Auth', '$state', HeaderController]);

function HeaderController($scope, Auth, $state){
    var self = this;
    self.showSideNav = showSideNav;
    self.logout = logout;
    
    showSideNav();
    
    function logout() {
        Auth.signout({}, function(doc){
        }, function(){
            $state.go('login');
        })
    }
    
    function showSideNav(){
        $(".button-collapse").sideNav();
    }
}