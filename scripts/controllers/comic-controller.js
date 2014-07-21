progressApp.controller('ComicController', ['$scope', function ($scope) {
	setInterval(function(){
		//randomly change actual and expected progress values
		//for demonstration purposes
		$scope.$apply(function(){
			$scope.actual = Math.random();		
			$scope.expected = Math.random();					
		});
	}, 1000);
}]);