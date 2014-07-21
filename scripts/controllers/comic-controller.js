progressApp.controller('ComicController', ['$scope', function ($scope) {
	setInterval(function(){
		$scope.$apply(function(){
			$scope.actual = Math.random();		
			$scope.expected = Math.random();					
		});
	}, 1000);
}]);