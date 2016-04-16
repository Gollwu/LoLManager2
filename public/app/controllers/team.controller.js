module.exports = function(app) {
    app.controller('TeamCtrl', ($scope, $http) => {
        // get teams from server
        $scope.teams = [];	
		$scope.blueTeamPlayers = []
		$scope.redTeamPlayers = []
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
				//Get Players from blue team
				$http({
					url: 'http://localhost\:5000/teams/'+encodeURIComponent($scope.firstTeam)+'/players',
					method: 'GET',				
				})
				.then((response) => {
					 response.data.forEach(function(player) {
						$scope.blueTeamPlayers.push(player.name); 
					 });			 			
					 console.log($scope.blueTeamPlayers);
				})
				.catch((err) => {
					console.log(err);
				}); 
				
				//Get Players from red team
				$http({
					url: 'http://localhost\:5000/teams/'+encodeURIComponent($scope.secondTeam)+'/players',
					method: 'GET',				
				})
				.then((response) => {
					 response.data.forEach(function(player) {
						$scope.redTeamPlayers.push(player.name); 
					 });			 			
					 console.log($scope.redTeamPlayers);
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

