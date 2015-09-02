angular.module('InternForum').factory('categories',['$http',function($http){
	var o ={
		'categories' :[]
	};
	o.getAll = function(){
		return $http.get('/category').success(function(data){
			console.log(data);
			angular.copy(data, o.categories);
		});
	};
	o.create = function(post){
		return $http.post('/posts',post).success(function(data){
			console.log('word');
			o.categories.push(data);
		});
	};
	o.get = function(id){
		return $http.get('/category/' + id).then(function(res){
			return res.data;
		});
	};
	o.addComment = function(id,comment){
		return $http.post('/posts/' + id + '/comments', comment);
	};
	return o;

}]);
