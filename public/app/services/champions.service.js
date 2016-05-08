module.exports = function(app) {
	app.factory('championsService', function($http){
	  return {		
		getAllChampions: function() {
            var champions = [];		
		    $http({
				url: 'http://localhost\:5000/champions',
				method: 'GET'
			})
			.then((response) => {					
				for(var i = 0; i < response.data.length; i++) {
					champions.push(response.data[i].name);
				}							
				console.log(champions);
				return champions;
			})				
			.catch((err) => {
				console.log(err);
			});  
		}
	  };
	});
};