module.exports = function(app) {
   app.factory('champSelectService', function($http){
	    return {
			data: [{
			  name: '',
			  champion: '',
			  team: 'blue'
			},{
			  name: '',
			  champion: '',
			  team: 'red'
			},{
			  name: '',
			  champion: '',
			  team: 'red'
			},{
			  name: '',
			  champion: '',
			  team: 'blue'
			},{
			  name: '',
			  champion: '',
			  team: 'blue'
			},{
			  name: '',
			  champion: '',
			  team: 'red'
			},{
			  name: '',
			  champion: '',
			  team: 'blue'
			},{
			  name: '',
			  champion: '',
			  team: 'blue'
			},{
			  name: '',
			  champion: '',
			  team: 'red'
			},{
			  name: '',
			  champion: '',
			  team: 'red'
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
			  redPlayersName.push(this.data[1]);
			  redPlayersName.push(this.data[2]);
			  redPlayersName.push(this.data[5]);
			  redPlayersName.push(this.data[6]);
			  redPlayersName.push(this.data[9]);
			  return redPlayers;
			},
			//Return a list of player objects for red team
			getBlueTeamPlayers: function() {		  
			  var bluePlayers = [];
			  bluePlayersName.push(this.data[0]);
			  bluePlayersName.push(this.data[3]);
			  bluePlayersName.push(this.data[4]);
			  bluePlayersName.push(this.data[7]);
			  bluePlayersName.push(this.data[8]);
			  return bluePlayers;
			}
		};	
	});
};

