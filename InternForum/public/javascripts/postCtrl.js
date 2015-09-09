angular.module('InternForum').controller(
	'postCtrl', [
	'$scope',
	'posts',
	'post',
	'authFactory',
	function($scope, posts, post,authFactory){
		$scope.post = post;
		console.log(post);

		$scope.addComment = function(){
		  if($scope.body === '' || !authFactory.isLoggedIn()) { return $scope.error = 'Log in, or register!'; }
		  posts.addComment(post._id, {
			body: $scope.body,
			author: authFactory.currentUser(),
		  }).success(function(comment) {
			$scope.post.comments.push(comment);
		  });
		  $scope.body = '';
		};
	}]);