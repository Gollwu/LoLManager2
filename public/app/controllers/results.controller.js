module.exports = function(app) {
    app.controller('ResultsCtrl', ($scope, $http, $timeout) => {
        // get teams from server    
		console.log($scope.champSelectOrder);			
		$scope.blueTeamPlayers = []	
		$scope.redTeamPlayers = []
		
        $scope.initResults = function() {					
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

