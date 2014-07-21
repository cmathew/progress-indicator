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
		
			var w = 300, h = 300, r = 150;			
			var vis = d3.select(".progress-indicator")
				.attr("width", w) //set the width and height of our visualization (these will be attributes of the <svg> tag
				.attr("height", h)
				.select(".render-group")
					.attr("transform", "translate(" + r + "," + r + ")") //move the center of the pie chart from 0, 0 to radius, radius						
				
			var actualProgress = vis.selectAll(".actual-progress")     //this selects all <g> elements with class slice (there aren't any yet)
				.attr("fill", function(d, i) { return "#78C000"; } ) //set the color for each slice to be chosen from the color function defined above
					
			var actualArcThickness = 20;
			attrs.$observe('actual', function(actual) {
				if (isNaN(parseFloat(actual))) { return; }

				var arc = d3.svg.arc() //this will create <path> elements for us using arc data
					.outerRadius(r)
					.innerRadius(r - actualArcThickness)			
					.startAngle(0)
					.endAngle(actual * 2 * Math.PI);	
				
				actualProgress.attr("d", arc);
			});

			var expectedProgress = vis.selectAll(".expected-progress")     //this selects all <g> elements with class slice (there aren't any yet)
				.attr("fill", function(d, i) { return "#C7E596"; } ) //set the color for each slice to be chosen from the color function defined above
			
			var expectedArcStart = (r - actualArcThickness) - 5; //5px of padding between arcs
			var expectedArcThickness = 10;			
			attrs.$observe('expected', function(expected) {
				if (isNaN(parseFloat(expected))) { return; }

				var arc = d3.svg.arc() //this will create <path> elements for us using arc data
					.outerRadius(expectedArcStart)
					.innerRadius(expectedArcStart - expectedArcThickness)			
					.startAngle(0)
					.endAngle(expected * 2 * Math.PI);	
				
				expectedProgress.attr("d", arc);				
			});									
		}
    };
});
