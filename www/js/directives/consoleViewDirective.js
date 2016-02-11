angular.module('synonyms')
	.directive(
		"bnLifecycle",
		function() {
			// I link the DOM element to the view model.
			function link($scope, element, attributes) {
				// Log that the directive has been linked.
				console.log("Linked:", attributes.id);
				// Listen for changes in the values collection.
				// When it changes, log the in-memory length in
				// comparison to the in-DOM length of the elements
				// generated based on the collection.
				$scope.$watch(
					"values.length",
					function(newValue, oldValue) {
						// Ignore first run that results from
						// initial watching binding.
						if (newValue === oldValue) {
							return;
						}
						// Gather the ngRepeat'd DOM elements.
						var values = $("span.value");
						console.log(attributes.id);
						console.log(
							"...",
							newValue, // In-memory.
							"in memory,",
							values.length, // In-DOM rendering.
							"in DOM"
						);
					}
				);
			}

			// Return directive configuration.
			return ({
				link: link,
				restrict: "A"
			});
		}
);