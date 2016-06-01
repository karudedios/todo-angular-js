angular.module('todoApp')
.controller('HeaderController', ['$scope', HeaderController]);

function HeaderController($scope){
    var self = this;
    self.showSideNav = showSideNav;

    $(".button-collapse").sideNav();
    
    function showSideNav(){
    }
}