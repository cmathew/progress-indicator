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
		
			var r = 150;			
			var vis = d3.select(".progress-indicator")
				.select(".render-group")
					.attr("transform", "translate(" + r + "," + r + ")") //center graphics according to radius						
				
			var textVis = d3.select(".progress-text-container");
								
			var determineProgressColor = function() {
				var diff = attrs.expected - attrs.actual;
				if (diff >= .5) {
					return "#b10";
				}
				else if (diff >= .25) {
					return "#f60";			
				}					
				return "#78C000";
			};
			
			var actualProgress = vis.selectAll(".actual-progress") 
					
			var circleText = textVis.selectAll(".progress-percentage");
			var actualArcThickness = 20;
			attrs.$observe('actual', function(actual) {
				
				if (isNaN(parseFloat(actual))) { return; }

				var arc = d3.svg.arc()
					.outerRadius(r)
					.innerRadius(r - actualArcThickness)			
					.startAngle(0)
					.endAngle(actual * 2 * Math.PI);	
											
				actualProgress.attr("d", arc)
					.attr("fill", function(d, i) { return determineProgressColor(); });					
				
				circleText.text(function(d){ return parseInt(actual * 100); })								
			});

			var expectedProgress = vis.selectAll(".expected-progress")
				.attr("fill", function(d, i) { return "#C7E596"; });
			
			var expectedArcStart = (r - actualArcThickness) - 5; //5px of padding between arcs
			var expectedArcThickness = 10;			
			attrs.$observe('expected', function(expected) {
				if (isNaN(parseFloat(expected))) { return; }

				var arc = d3.svg.arc()
					.outerRadius(expectedArcStart)
					.innerRadius(expectedArcStart - expectedArcThickness)			
					.startAngle(0)
					.endAngle(expected * 2 * Math.PI);	
				
				expectedProgress.attr("d", arc);	

				actualProgress.attr("fill", function(d, i) { return determineProgressColor(); });	
			});		

			var progressCircleStart = expectedArcStart - expectedArcThickness - 5; //5px of padding	
			vis.selectAll(".progress-circle")		
				.attr("r", progressCircleStart);
		}
    };
});
