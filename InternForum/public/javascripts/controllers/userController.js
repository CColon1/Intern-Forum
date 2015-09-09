/**
 * Created by 502434605 on 9/3/2015.
 */

angular.module('InternForum')

    .controller('userController', [
        '$scope',
        '$state',
        '$http',
        'authFactory',
        'imageFactory',
        'imagePromise',
        function($scope, $state, $http, authFactory,imageFactory,imagePromise){
            $scope.getFiles = imagePromise;
            $scope.uploadFile = function(files,user){
               var fd = new FormData();
                if(!user) {
                    console.log('no user brah');
                    return;
                }
               console.log(user);
               fd.append("filefield", files[0],user);

               $http.post('/user', fd,{
                   withCredentials: true,
                   headers: {'Content-Type': undefined },
                   transformRequest: angular.identity
               })
                .success()
                .error();

           };


        }])