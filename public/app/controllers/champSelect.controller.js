var Promise = require('promise');

module.exports = function(app) {
    app.controller('ChampionSelectCtrl', ($scope, $http, $timeout, champSelectService, championsService) => {  		
        $scope.init = function() {	
			//get all champions
			$scope.champions = championsService.getAllChampions();
			console.log($scope.champions);
			
			$scope.blueTeam = "Team Solo Jefe";
			$scope.redTeam = "Counter Daoulas Gaming";				
			
			var promises = champSelectService.fillPlayers($scope.blueTeam, $scope.redTeam);
			Promise.all(promises)
				.then(() => {						
					$scope.blueTeamPlayers = champSelectService.getBlueTeamPlayersName();	
					$scope.redTeamPlayers = champSelectService.getRedTeamPlayersName();							
					$scope.$apply()						
				})
				.catch((err) => {
					reject(err);
				});					
				
            			
        };
    });	
};

