/**
 * Created by 502434605 on 9/1/2015.
 */

var app = angular.module('InternForum',[])

app.controller('AuthCtrl', [
    '$scope',
    '$state',
    'authFactory',
    function($scope, $state, authFactory){
        $scope.user = {};

        $scope.register = function(){
            authFactory.register($scope.user).error(function(error){
                $scope.error = error;
            }).then(function(){
                $state.go('home');
            });
        };

        $scope.logIn = function(){
            authFactory.logIn($scope.user).error(function(error){
                $scope.error = error;
            }).then(function(){
                $state.go('home');
            });
        };
    }])