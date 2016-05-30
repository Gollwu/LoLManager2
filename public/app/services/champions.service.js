module.exports = function(app) {
	app.service('championsService', function($http){	   		
		var champions = [];
		
		this.retrieveChampions = function() {
            var promise = $http({
				url: 'champions',
				method: 'GET'
			})
			.then((response) => {					
				for(var i = 0; i < response.data.length; i++) {
					champions.push(response.data[i].name);
				}					
			})				
			.catch((err) => {
				console.log(err);
			});  
		}
		
		this.getAllChampions = function() {
            return champions;
		}
	  
	});
};