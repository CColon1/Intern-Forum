/**
 * Created by 502434605 on 9/3/2015.
 */
angular.module('InternForum').factory('imageFactory',['$http',function($http){
    var Q ={'images' : [] };

    Q.get = function(id){
        return $http.get('/user/' + id).then(function(res){
            return res.config.url;
        });
    };

    return Q;

}]);
