angular.module('InternForum').factory('posts',['$http',function($http){
	var o ={
		'posts' :[]
	};
	o.getAll = function(){
		return $http.get('/posts').success(function(data){
			angular.copy(data, o.posts);
		});
	};
	o.create = function(categoryId, post){
		return $http.post('/category/'+categoryId ,post).success(function(data){
			o.posts.push(data);
		});
	};
	o.get = function(id){
		return $http.get('/posts/' + id).then(function(res){
			return res.data;
		});
	};
	o.addComment = function(id,comment){
		return $http.post('/posts/' + id + '/comments', comment);
	};
	return o;

}]);
