angular.module('InternForum').factory('categories',['$http',function($http){
	var o ={
		'categories' :[]
	};
	o.getAll = function(){
		return $http.get('/category').success(function(data){
			angular.copy(data, o.categories);
		});
	};
	o.create = function(id,post){
		return $http.post('/category/' + id,post).success(function(data){
			for(var category in o.categories){
				if(o.categories[category]._id == id){
					o.categories[category].posts.push(data);
				}
			}
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
