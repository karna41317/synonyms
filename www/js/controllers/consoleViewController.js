angular.module('synonyms')
	.controller('consoleViewController', ['$scope', 'dataFeedService', '$location', '$ionicScrollDelegate', '$timeout', '$compile',
		function($scope, dataFeedService, $location, $ionicScrollDelegate, $timeout, $compile) {
			$scope.form = {};
			$scope.$on('$stateChangeSuccess', function() {
				var templateInStorage = unescape(localStorage["templateInStorage"]);
				if (templateInStorage === "undefined") {} else {
					$('#console-view-container').append(templateInStorage);
				}
			});

			$scope.getWord = function($event) {
				/*		console.log($scope.linkItem);*/
				console.log($event.target);
				var passedWord = angular.element($event.target).text();
				var passedWord = angular.element($event.target).attr("name");
				console.log(passedWord);
				$scope.search(passedWord);
			}

			$scope.testDB = function(searchKey) {
				dataFeedService.findBySearchKey(searchKey).then(function(data) {
					console.log(data);
				});
			}


			$scope.search = function(searchKey) {
				var epochTime = new Date().getTime();
				var now = moment().format(); // 2015-03-30T15:47:41+02:00

				dataFeedService.findBySearchKey(searchKey).then(function(data) {
					console.log(data);
					var template = '<div id="' + epochTime + '"><div class="card"><div class="item item-text-wrap"><div class="card-header"><p>' + data.word + '</p><time class="relative-time" datetime ="' + now + '"></time></div>' + data.article + '</div></div></div>';
					if (searchKey) {
						var compiledTemplate = $compile(template)($scope);

						// add Searched Word to Container
						$('#console-view-container').append(compiledTemplate);

						// Move to last searched Word
						var lastId = $('#console-view-container').children().last().attr('id');
						$timeout(function() {
							$location.hash(lastId);
							$ionicScrollDelegate.anchorScroll(true);
						});

						// Remove top searched elememt if searched words more than n
						var numberOfSearches = $('#console-view-container').find('.row').length;
						if (numberOfSearches > 10) {
							var firstchild = $('#console-view-container').children().first();
							firstchild.remove();
						}

						// Save to Storage :
						var div = $('<div></div>');
						$("#console-view-container").clone().appendTo(div);
						localStorage["templateInStorage"] = escape(div.html());

						// clear Search Key
						$scope.form.searchKey = '';
					}

				});
			}



			/*		$scope.search = function(searchKey) {
				var epochTime = new Date().getTime();
				var now = moment().format(); // 2015-03-30T15:47:41+02:00

				dataFeedService.findAll().then(function(data) {

					angular.forEach(data, function(value, key) {

						var template = '<div id="' + epochTime + '"><div class="row"><div class ="col"><div class="card"><div class="item item-text-wrap"><div class="card-header"><p>' + value.word + '</p><time class="relative-time" datetime ="' + now + '"></time></div><p>' + value.article + '</p></div></div></div></div></div>';

						if (searchKey) {
							if (value.word.toLowerCase() === searchKey.toLowerCase()) {
								var compiledTemplate = $compile(template)($scope);
								// add Searched Word to Container
								$('#console-view-container').append(compiledTemplate);

								// Move to last searched Word
								var lastId = $('#console-view-container').children().last().attr('id');
								$timeout(function() {
									$location.hash(lastId);
									$ionicScrollDelegate.anchorScroll(true);
								});
								// Remove top searched elememt if searched words more than n
								var numberOfSearches = $('#console-view-container').find('.row').length;
								if (numberOfSearches > 10) {
									var firstchild = $('#console-view-container').children().first();
									firstchild.remove();
								}

								// Save to Storage :
								var div = $('<div></div>');
								$("#console-view-container").clone().appendTo(div);
								localStorage["templateInStorage"] = escape(div.html());

								// clear Search Key
								$scope.form.searchKey = '';
							}
						}
					});
				});
			}
*/

			updateRelativeTime = function() {
				$timeout(function() {
					var now = moment();
					var allElements = $('time');
					allElements.each(function(i, e) {
						if ($(e).attr("class") == 'relative-time') {
							var time = moment($(e).attr('datetime'));
							$(e).html('<p>' + time.from(now) + '</p>');
						}
					})
				})
			}
			// Update all dates initially
			updateRelativeTime();
			// Register the timer to call it again every minute
			setInterval(updateRelativeTime, 600);

			$scope.clearAll = function($event) {
				console.log($event);
				$("#console-view-container").empty();
				delete localStorage.templateInStorage;

				/*			var myNode = document.getElementById("console-view-container");
				while (myNode.firstChild) {
					myNode.removeChild(myNode.firstChild);
				}
				delete localStorage.templateInStorage;*/
			}

		}
	]);