/**
 * Created by 502434605 on 8/31/2015.
 */

angular.module('InternForum')

.factory('authFactory',['$http', '$window', function($http, $window){
    var auth = {};

    auth.saveToken = function(token) {
        $window.localStorage['user-token'] = token;

    };
    auth.getToken = function (){
        return $window.localStorage['user-token'];
    }

    auth.isLoggedIn = function(){
        var token = auth.getToken();

        if(token){
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    auth.currentUser = function(){
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };

    auth.logIn = function(user){
        return $http.post('/login', user).success(function(data){
            auth.saveToken(data.token);
        });
    };

    auth.logOut = function(){
        $window.localStorage.removeItem('user-token');
    };

    auth.register = function(user){
        return $http.post('/register', $.param(user),{
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}).success(function(data){
            auth.saveToken(data.token);
        });
    };

    return auth;
}])