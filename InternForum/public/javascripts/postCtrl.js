app.controller('postCtrl', [
'$scope',
'posts',
'post',
function($scope, posts, post, auth){
	$scope.post = post;
	console.log(post);
	$scope.addComment = function(){
	  if($scope.body === '') { return; }
	  posts.addComment(post._id, {
	    body: $scope.body,
	    author: "user",
	  }).success(function(comment) {
	    $scope.post.comments.push(comment);
	  });
	  $scope.body = '';
	};

}]);