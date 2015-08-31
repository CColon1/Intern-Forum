angular.module('InternForum').controller(
	'homeCtrl', [
	'$scope',
	'$stateParams',
	function($scope, $stateParams){
	  $scope.pageTitle = "Intern Forums";
	  $scope.data = [{title:'what',author: 'Kody'},{title:'blah',author: 'chris'},{title:'what',author: 'admin'},{title:'what',author: 'Kody'}];

}]);