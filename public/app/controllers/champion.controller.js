module.exports = function(app) {
    app.controller('ChampionCtrl', ($scope, $http) => {
        // get teams from server
        $scope.champions = [];	
	
        $scope.init = function() {					
            $http({
                url: 'http://localhost\:5000/champions',
                method: 'GET'
            })
            .then((response) => {					
                for(var i = 0; i < response.data.length; i++) {
                    $scope.champions.push(response.data[i].name);
                }								
            })				
            .catch((err) => {
                console.log(err);
            });  
			
		
        };	
    });
};

