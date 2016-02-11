var DB = null;
angular.module('synonyms')
	.factory('dataFeedService', function($q, $http, $cordovaSQLite, $timeout, $ionicPlatform) {
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

		return {
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