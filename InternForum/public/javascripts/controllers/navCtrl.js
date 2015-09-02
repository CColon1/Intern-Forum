/**
 * Created by 502434605 on 9/1/2015.
 */

angular.module('InternForum')

.controller('NavCtrl', [
    '$scope',
    'authFactory',
    function($scope, authFactory){
        $scope.isLoggedIn = authFactory.isLoggedIn;
        $scope.currentUser = authFactory.currentUser;
        $scope.logOut = authFactory.logOut;
    }]);