module.exports = function(app) {
    app.controller('ResultsCtrl', ($scope, $http, $timeout, champSelectService) => {
	
		$scope.blueTeam = "Team Solo Jefe";
		$scope.redTeam = "Counter Daoulas Gaming";	
		
        // get teams champion select service    
		$scope.blueTeamPlayers = champSelectService.getBlueTeamPlayers();	
		$scope.redTeamPlayers = champSelectService.getRedTeamPlayers();	
		
        $scope.initResults = function() {					
            
        };
    });	
};

