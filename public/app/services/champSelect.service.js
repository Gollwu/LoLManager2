module.exports = function(app) {
   app.factory('champSelectService', function($http){
	    return {
			data: [{
			  name: '',
			  champion: '',
			  team: 'blue',
			  affinity: 0
			},{
			  name: '',
			  champion: '',
			  team: 'red',
			  affinity: 0
			},{
			  name: '',
			  champion: '',
			  team: 'red',
			  affinity: 0
			},{
			  name: '',
			  champion: '',
			  team: 'blue',
			  affinity: 0
			},{
			  name: '',
			  champion: '',
			  team: 'blue',
			  affinity: 0
			},{
			  name: '',
			  champion: '',
			  team: 'red',
			  affinity: 0
			},{
			  name: '',
			  champion: '',
			  team: 'blue',
			  affinity: 0
			},{
			  name: '',
			  champion: '',
			  team: 'blue',
			  affinity: 0
			},{
			  name: '',
			  champion: '',
			  team: 'red',
			  affinity: 0
			},{
			  name: '',
			  champion: '',
			  team: 'red',
			  affinity: 0
			}],
			playerPicking:0,
			// Receives the name of both team and updates the player names for the champ select
			fillPlayers: function(blueTeamName, redTeamName) {		
				var promises = [];
				
				//Get Players from blue team
				var promise =  $http({
					url: 'http://localhost\:5000/teams/'+encodeURIComponent(blueTeamName)+'/players',
					method: 'GET',				
				})
				.then((response) => {
				    this.data[0].name = response.data[0].name;
					this.data[3].name = response.data[1].name;
					this.data[4].name = response.data[2].name;
					this.data[7].name = response.data[3].name;
					this.data[8].name = response.data[4].name;	
				})
				.catch((err) => {
					console.log(err);
				}); 
				promises.push(promise);
				
				//Get Players from red team
				promise = $http({
					url: 'http://localhost\:5000/teams/'+encodeURIComponent(redTeamName)+'/players',
					method: 'GET',				
				})
				.then((response) => {
					this.data[1].name = response.data[0].name;
					this.data[2].name = response.data[1].name;
					this.data[5].name = response.data[2].name;
					this.data[6].name = response.data[3].name;
					this.data[9].name = response.data[4].name;					
				})
				.catch((err) => {
					console.log(err);
				}); 
				promises.push(promise);
				
				return promises	
			},
			//get player pucking name and increment player picking
			getPlayerPicking: function() {		
				return this.data[this.playerPicking].name;
			},	
			isChampSelectFinished: function() {		
				return (this.playerPicking == 9);
			},
			incrementPlayerPicking: function() {
				this.playerPicking++;
			},				
			//Receives a player name and a champions name and assign the champion to the player
			updatePlayerChampion: function(name, champion) {			 
			    this.data.forEach(function myFunction(player) {
					if(player.name==name){
						player.champion = champion;
					}
				}); 
			},			
			//Return a list of players names for red team
			getRedTeamPlayersName: function() {		  
			  var redPlayersName = [];
			  redPlayersName.push(this.data[1].name);
			  redPlayersName.push(this.data[2].name);
			  redPlayersName.push(this.data[5].name);
			  redPlayersName.push(this.data[6].name);
			  redPlayersName.push(this.data[9].name);
			  return redPlayersName;
			},
			//Return a list of players names for red team
			getBlueTeamPlayersName: function() {		  
			  var bluePlayersName = [];
			  bluePlayersName.push(this.data[0].name);
			  bluePlayersName.push(this.data[3].name);
			  bluePlayersName.push(this.data[4].name);
			  bluePlayersName.push(this.data[7].name);
			  bluePlayersName.push(this.data[8].name);
			  return bluePlayersName;
			},
			//Return a list of player objects for red team
			getRedTeamPlayers: function() {		  
			  var redPlayers = [];
			  redPlayers.push(this.data[1]);
			  redPlayers.push(this.data[2]);
			  redPlayers.push(this.data[5]);
			  redPlayers.push(this.data[6]);
			  redPlayers.push(this.data[9]);
			  return redPlayers;
			},
			//Return a list of player objects for red team
			getBlueTeamPlayers: function() {		  
			  var bluePlayers = [];
			  bluePlayers.push(this.data[0]);
			  bluePlayers.push(this.data[3]);
			  bluePlayers.push(this.data[4]);
			  bluePlayers.push(this.data[7]);
			  bluePlayers.push(this.data[8]);
			  return bluePlayers;
			},
			
			//Set the affinities of the players with their champion once champ select is done
			setAffinities: function() {		  
				var promises = [];
			    this.data.forEach(function a(player,index) {
					promises.push($http({
						url: 'http://localhost\:5000/players/'+encodeURIComponent(player.name),
						method: 'GET'
					})
					.then((response) => {
						response.data.championsAffinity.forEach(function b(champion) {
							if(champion.name==player.champion){
								player.affinity = champion.affinity
							}
						});					
					}));	
				}); 
				return promises;
			}
		};	
	});
};

