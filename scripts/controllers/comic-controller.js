progressApp.controller('ComicController', ['$scope', '$interval', function ($scope, $interval) {
	$interval(function(){
		//randomly change actual and expected progress values
		//for demonstration purposes
		$scope.actual = Math.random();		
		$scope.expected = Math.random();					
	}, 1000);
}]);