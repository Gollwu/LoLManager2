module.exports = function(app) {
	app.factory('championsService', function($http){
	  return {		
		champions: [],
		retrieveChampions: function() {
            var promise = $http({
				url: 'champions',
				method: 'GET'
			})
			.then((response) => {					
				for(var i = 0; i < response.data.length; i++) {
					this.champions.push(response.data[i].name);
				}					
			})				
			.catch((err) => {
				console.log(err);
			});  
		},
		getAllChampions: function() {
            return this.champions;
		}
	  };
	});
};