module.exports = function(app) {
    app.controller('TeamCtrl', ($scope, $http, $timeout) => {
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
				$scope.blueTeam = response.data[0];
				$scope.redTeam = response.data[1];				
                for(var ii = 0; ii < response.data.length; ii++) {
                    $scope.teams.push(response.data[ii]);
                }	
				
				//Get Players from blue team
				$http({
					url: 'http://localhost\:5000/teams/'+encodeURIComponent($scope.blueTeam)+'/players',
					method: 'GET',				
				})
				.then((response) => {
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

