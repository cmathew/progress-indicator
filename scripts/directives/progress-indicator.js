progressApp.directive('progressIndicator', function() {
	return {
		restrict: 'E',		
		templateUrl: 'partials/_progress.html',
		link: function(scope, element, attrs){
			scope.expected = attrs.expected;
			scope.actual = attrs.actual;			
		}
    };
});
