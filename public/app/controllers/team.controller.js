var consoleLogger = require('../../../app/logger/logger');

module.exports = function(app) {
    app.controller('TeamCtrl', ($scope, $http) => {
        // get teams from server
        $scope.teams = [];	
        $scope.init = function() {					
            $http({
                url: 'http://localhost\:5000/teams',
                method: 'GET'
            })
            .then((response) => {
                //TODO Case not 2 teams ?    
					
				$scope.firstTeam = response.data[0];
				$scope.secondTeam = response.data[1];				
                for(var ii = 0; ii < response.data.length; ii++) {
                    $scope.teams.push(response.data[ii]);
                }
				
				consoleLogger.info('http://localhost\:5000/teams/'+encodeURIComponent($scope.firstTeam)+'/players');	
				$http({
					url: 'http://localhost\:5000/teams/'+encodeURIComponent($scope.firstTeam)+'/players',
					method: 'GET',				
				})
				.then((response) => {
					$scope.BS = response.data;               
				})
				.catch((err) => {
					console.log(err);
				}); 
            })				
            .catch((err) => {
                console.log(err);
            });  
        };	
    });
};

