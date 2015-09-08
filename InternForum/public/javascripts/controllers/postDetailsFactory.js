/**
 * Created by 502434605 on 9/2/2015.
 */

angular.module('InternForum').factory('detailsFactory',['$scope','$http',function($scope,$http){

    var postDetails = {'details' : [] };

    postDetails.getDetails = function(currentPost){
        return $http.get('/posts/:$scope.currentPost').success(function(data){
            angular.copy(data, postDetails.details);
        }).error(function(err){
            console.log(err);
        });
    };
    return postDetails;
}]);
