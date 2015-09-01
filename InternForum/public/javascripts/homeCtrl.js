angular.module('InternForum').controller(
	'homeCtrl', [
	'$scope',
	'posts',
	function($scope,  posts){
	  $scope.pageTitle = "Intern Forums";
	  $scope.data = posts.posts;
	  console.log(angular.toJson(posts));
	  $scope.addPost = function(){
	  	if(!$scope.title || $scope.title === ''){return;}
	  	posts.create({
	  		title:$scope.title,
	  		message:$scope.message,
	  	});
	  	$scope.title = '';
	  	$scope.message='';
	  };
}]);