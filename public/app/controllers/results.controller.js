var Promise = require('promise');

module.exports = function(app) {
    app.controller('ResultsCtrl', ($scope, $http, $timeout, champSelectService) => {
	
		$scope.blueTeam = "Team Solo Jefe";
		$scope.redTeam = "Counter Daoulas Gaming";	        
		
        $scope.initResults = function() {			
			var promises = champSelectService.setAffinitiesAndPerformances();
			Promise.all(promises)
				.then(() => {	
					// get teams champion select service    
					$scope.blueTeamPlayers = champSelectService.getBlueTeamPlayers();	
					$scope.redTeamPlayers = champSelectService.getRedTeamPlayers();		
					
					champSelectService.assignScores();					
					console.log("WTFFFFFFFF");	
					console.log("BlueTeam : " + $scope.blueTeamPlayers);					
					$scope.$apply();									
				})
				.catch((err) => {
					reject(err);
				});	
        };
    });	
};

