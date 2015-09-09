angular.module('InternForum').controller(
	'homeCtrl', [
	'$scope',
	'posts',
	'categories',
	function($scope,  posts,categories){
	  $scope.pageTitle = "Intern Forums";	  
	  $scope.categories = categories.categories;
	  $scope.posts = $scope.categories[0].posts;
	  $scope.CategoryId = $scope.categories[0]._id;
	  $scope.setTab = function(category){
	  	$scope.CategoryId = category._id;
	  	$scope.posts = category.posts;
	  };
	  console.log($scope.categories);
	  $scope.addPost = function(){
	  	if(!$scope.title || $scope.title === ''){return;}
	  	categories.create($scope.CategoryId, {
	  		title:$scope.title,
	  		body:$scope.message,
	  		category: $scope.CategoryId

	  	});
	  	$scope.title = '';
	  	$scope.message='';
	  };
		$scope.gotoComments = function(event){
			$scope.currentPost = event;
			$state.go('postDetails');
			//console.log(angular.toJson(event));
		}
}]);