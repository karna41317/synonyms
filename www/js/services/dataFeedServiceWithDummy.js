var DB = null;
angular.module('synonyms')
	.factory('dataFeedService', function($q, $http, $cordovaSQLite, $timeout, $ionicPlatform) {
		/*		$ionicPlatform.ready(function() {
			window.plugins.sqlDB.copy("synonymsDB.sqlite", function() {
				DB = $cordovaSQLite.openDB("synonymsDB.sqlite");
			}, function(error) {
				if (error && error.code == 516) {
					DB = $cordovaSQLite.openDB("synonymsDB.sqlite");


				} else {
					console.error("There was an error copying the database: " + error);
				}

			});
		});
*/

		$ionicPlatform.ready(function() {
			DB = sqlitePlugin.openDatabase({
				name: "synonymsDB.sqlite",
				location: 2,
				createFromLocation: 1
			}, function() {
				console.log('success');
			}, function() {
				console.log('failure');
			});
		});

		var dummyData = [{
			'_id': '0',
			'word': 'angular',
			'article': 'it is a <a class="refer-word" name="javascript" ng-model="linkItem" ng-init="linkItem=42" ng-click="getWord($event)">javascript</a> framework for <a class="refer-word" ng-click="getWord()" name="client">client</a> side'
		}, {
			'_id': '1',
			'word': 'javascript',
			'article': 'It is a computer programming language to enhance <a class="refer-word" ng-click="getWord()"  ng-model="linkItem" ng-init="linkItem=42" name="HTML">HTML</a> pages'
		}, {
			'_id': '2',
			'word': 'HTML',
			'article': 'html is hyper text mark up language,  is the standard markup language used to create web pages'
		}, {
			'_id': '3',
			'word': 'CSS',
			'article': 'It is is a style sheet language used for describing the look and formatting of a document written in a <a class="refer-word" ng-click="getWord()" name="HTML">HTML</a>'
		}, {
			'_id': '4',
			'word': 'Webapp',
			'article': 'application built with  <a class="refer-word" ng-click="getWord()" name="HTML">HTML</a>,  <a class="refer-word" ng-click="getWord()" name="CSS">CSS</a> and <a class="refer-word" ng-click="getWord()" name="Javascript">Javascript</a>. sometimes <a class="refer-word" ng-click="getWord()" name="nodeJS">nodeJS</a> can also be used'
		}, {
			'_id': '5',
			'word': 'ionic',
			'article': 'ionic is a mobile hybrid application developement framework powered by<a class="refer-word" ng-click="getWord()" name="angular">angular</a>'
		}, {
			'_id': '6',
			'word': 'nodeJS',
			'article': 'node js is a server side <a class="refer-word" ng-click="getWord()" name="javascript">javascript</a> language, used to built <a class="refer-word" ng-click="getWord()" name="Webapp">Webapp</a>'
		}, {
			'_id': '7',
			'word': 'console',
			'article': 'window where you can see logs for the <a class="refer-word" ng-click="getWord()" name="Webapp">Webapp</a> built with <a class="refer-word" ng-click="getWord()" name="Javascript">Javascript</a> , <a class="refer-word" ng-click="getWord()" name="HTML">HTML</a> and <a class="refer-word" ng-click="getWord()" name="CSS">CSS</a>'
		}, {
			'_id': '8',
			'word': 'debugging',
			'article': 'debugging is how you find reasons for existing bugs in <a class="refer-word" ng-click="getWord()" name="Webapp">Webapp</a>'
		}, {
			'_id': '9',
			'word': 'cordova',
			'article': 'Apache Cordova is a set of device APIs that allow a mobile app developer to access native device function such as the camera or accelerometer from <a class="refer-word" ng-click="getWord()" name="Javascript">Javascript</a>'
		}, {
			'_id': '10',
			'word': 'client',
			'article': 'its the one user can see and interact'
		}];

		return {

			findAll: function() {
				var deferred = $q.defer();
				var query = "SELECT rowid as _id,* FROM en_sv";
				var allWords = $cordovaSQLite.execute(DB, query).then(function(res) {
					if (res.rows.length > 0) {
						var arr_result = [];
						console.log(res.rows.item(0));
						for (var i = 0; i < res.rows.length; i++) {
							arr_result.push({
								_id: res.rows.item(i)._id,
								word_name: res.rows.item(i).word_name,
								word_mean: res.rows.item(i).word_mean
							});
						}
					}
					deferred.resolve(arr_result);
				});
				return deferred.promise;
			},
			findBySearchKey: function(searchKey) {
				var deferred = $q.defer();
				console.log(searchKey);
				var query = "SELECT rowid as _id,* FROM en_sv WHERE word = (?)";
				var word = $cordovaSQLite.execute(DB, query, [searchKey]).then(function(res) {
					if (res.rows.length > 0) {
						deferred.resolve(res.rows.item(0));
					}

				}, function(error) {
					console.log('error in DB transaction', error);
				});
				return deferred.promise;
			}
		}
	});