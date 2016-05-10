var Promise = require('promise');

module.exports = function(app) {
    app.controller('ChampionSelectCtrl', ($scope, $http, $timeout, champSelectService, championsService) => {  		
        $scope.init = function() {				
			//Get champions and players for display
			$scope.blueTeam = "Team Solo Jefe";
			$scope.redTeam = "Counter Daoulas Gaming";				
			var championPromise = championsService.retrieveChampions();
			var promises = champSelectService.fillPlayers($scope.blueTeam, $scope.redTeam);
			promises.push(championPromise);
			
			Promise.all(promises)
				.then(() => {						
					$scope.blueTeamPlayers = champSelectService.getBlueTeamPlayersName();	
					$scope.redTeamPlayers = champSelectService.getRedTeamPlayersName();			
					$scope.champions = championsService.getAllChampions();	
					$scope.$apply()						
				})
				.catch((err) => {
					reject(err);
				});				
        };
    });	
};

