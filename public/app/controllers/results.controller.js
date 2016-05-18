var Promise = require('promise');

module.exports = function(app) {
    app.controller('ResultsCtrl', ($scope, $http, $timeout, champSelectService) => {
	
		$scope.blueTeam = "Team Solo Jefe";
		$scope.redTeam = "Counter Daoulas Gaming";	        
		
        $scope.initResults = function() {			
			var promises = champSelectService.setPerformances();
			Promise.all(promises)
				.then(() => {	
					// get teams champion select service    
					$scope.blueTeamPlayers = champSelectService.getBlueTeamPlayers();	
					$scope.redTeamPlayers = champSelectService.getRedTeamPlayers();		
					
					var winner = champSelectService.assignScores();		
					console.log(winner);					
					$scope.blueWinLose = (winner == "Blue" ? "victory" : "defeat"); 
					$scope.redWinLose = (winner == "Red" ? "victory" : "defeat"); 
									
					$scope.$apply();									
				})
				.catch((err) => {
					reject(err);
				});	
        };
    });	
};

