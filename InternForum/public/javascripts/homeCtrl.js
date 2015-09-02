angular.module('InternForum').controller(
	'homeCtrl', [
	'$scope',
	'$state',
	'posts',
	function($scope, $state, posts){
	  $scope.pageTitle = "Intern Forums";
	  $scope.data = posts.posts;
	  //console.log(angular.toJson(posts));
	  $scope.addPost = function(){
	  	if(!$scope.title || $scope.title === ''){return;}
	  	posts.create({
	  		title:$scope.title,
	  		message:$scope.message,
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