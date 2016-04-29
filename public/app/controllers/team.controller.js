module.exports = function(app) {
    app.controller('TeamCtrl', ($scope, $http, $timeout) => {
        // get teams from server    
		$scope.champSelectOrder = [];			
		$scope.blueTeamPlayers = []
		$scope.redTeamPlayers = []
        $scope.init = function() {					
            $http({
                url: 'http://localhost\:5000/teams',
                method: 'GET'
            })
            .then((response) => {	
				$scope.blueTeam = response.data[0];
				$scope.redTeam = response.data[1];	
				
				//Get Players from blue team
				$http({
					url: 'http://localhost\:5000/teams/'+encodeURIComponent($scope.blueTeam)+'/players',
					method: 'GET',				
				})
				.then((response) => {
				    $scope.playerPicking = response.data[0].name;
					response.data.forEach(function(player) {
						$scope.blueTeamPlayers.push(player.name); 
					});	
					//Fill champSelectOrder
					$scope.champSelectOrder[0]=$scope.blueTeamPlayers[0];		
					$scope.champSelectOrder[3]=$scope.blueTeamPlayers[1];
					$scope.champSelectOrder[4]=$scope.blueTeamPlayers[2];
					$scope.champSelectOrder[7]=$scope.blueTeamPlayers[3];
					$scope.champSelectOrder[8]=$scope.blueTeamPlayers[4];	
				})
				.catch((err) => {
					console.log(err);
				}); 
				
				//Get Players from red team
				$http({
					url: 'http://localhost\:5000/teams/'+encodeURIComponent($scope.redTeam)+'/players',
					method: 'GET',				
				})
				.then((response) => {
					 response.data.forEach(function(player) {
						$scope.redTeamPlayers.push(player.name); 
					 });		
					 //Fill champSelectOrder
					$scope.champSelectOrder[1]=$scope.redTeamPlayers[0];		
					$scope.champSelectOrder[2]=$scope.redTeamPlayers[1];
					$scope.champSelectOrder[5]=$scope.redTeamPlayers[2];
					$scope.champSelectOrder[6]=$scope.redTeamPlayers[3];
					$scope.champSelectOrder[9]=$scope.redTeamPlayers[4];
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

