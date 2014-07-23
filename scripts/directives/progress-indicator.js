progressApp.directive('progressIndicator', function() {
	return {
		restrict: 'E',	
		replace: true,
        scope: {
            actual: "@",
            expected: "@"
        },		
		templateUrl: 'partials/_progress.html',
		link: function(scope, element, attrs){	
			//wrap root element of directive in d3 object
			var root = d3.select(element[0]);
			//actual progress arc will change color
			//as it falls behind expected progress
			var determineProgressColor = function() {
				var diff = attrs.expected - attrs.actual;
				if (diff >= .5) {					
					return "very-weak";
				}
				else if (diff >= .25) {
					return "weak";			
				}					
				return "good";
			};
			
			var createArc = function(start, thickness) {
				//arc will be outerRadius - innerRadius pixels wide			
				return d3.svg.arc()
					.outerRadius(start)
					.innerRadius(start - thickness)			
					.startAngle(0);			
			};			
			
			var vis = root.selectAll('.progress-vis-container');			
			var actualProgress = vis.selectAll('.actual-progress');
						
			var text = root.selectAll('.progress-text-container');				
			var circleText = text.selectAll('.progress-percentage');
			//150 is half the size of graphic
			//todo: magic number
			var actualArc = createArc(150, 20);					
			attrs.$observe('actual', function(actual) {				
				if (isNaN(parseFloat(actual))) { return; }	
				//update arc length	and color
				actualArc.endAngle(actual * 2 * Math.PI);
				actualProgress.attr("d", actualArc)
					.attr("data-download-health", function(d, i) { return determineProgressColor(); });					
				//show actual progress as a integer percentage
				circleText.text(function(d){ return parseInt(actual * 100); })								
			});

			//draw code for expected arc
			var expectedProgress = vis.selectAll(".expected-progress")
				.attr("fill", function(d, i) { return "#C7E596"; });
			//5px of padding between arcs
			var expectedArc = createArc(actualArc.innerRadius()() - 5, 10);				
			attrs.$observe('expected', function(expected) {
				if (isNaN(parseFloat(expected))) { return; }
				//update expected arc length
				expectedArc.endAngle(expected * 2 * Math.PI);					
				expectedProgress.attr("d", expectedArc);	
				//update actual arc color
				actualProgress.attr("fill", function(d, i) { return determineProgressColor(); });	
			});		

			//circle should be a little smaller than innermost arc
			var progressCircleStart = expectedArc.innerRadius()() - 5;
			vis.selectAll(".progress-circle")		
				.attr("r", progressCircleStart);
		}
    };
});
