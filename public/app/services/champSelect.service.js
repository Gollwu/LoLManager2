module.exports = function(app) {
   app.factory('champSelectService', function($http){
	    return {
			data: [{
			  name: '',
			  champion: '',
			  team: 'Blue',
			  role: 'Top',			  
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0,
			},{
			  name: '',
			  champion: '',
			  team: 'Red',		
			  role: 'Top',				  
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0
			},{
			  name: '',
			  champion: '',
			  team: 'Red',
			  role: 'Jungler',		
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0
			},{
			  name: '',
			  champion: '',
			  team: 'Blue',	
		      role: 'Jungler',
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0
			},{
			  name: '',
			  champion: '',
			  team: 'Blue',
			  role: 'Mid',	
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0
			},{
			  name: '',
			  champion: '',
			  team: 'Red',
			  role: 'Mid',			  
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0
			},{
			  name: '',
			  champion: '',
			  team: 'Red',
			  role: 'Marksman',
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0
			},{
			  name: '',
			  champion: '',
			  team: 'Blue',
			  role: 'Marksman',			  
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0
			},{
			  name: '',
			  champion: '',
			  team: 'Blue',	
			  role: 'Support',			
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0
			},{
			  name: '',
			  champion: '',
			  team: 'Red',	
			  role: 'Support',				  
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0
			}],
			//ID of the player currently picking
			playerPicking:0,
			//Ratios of KDA by role
			KDARatios: [{role:"Top", kill:"20", death:"25", assist:"25"}, 
						{role:"Jungler", kill:"15", death:"20", assist:"25"}, 
						{role:"Mid", kill:"30", death:"15", assist:"15"}, 
						{role:"Marksman", kill:"30", death:"15", assist:"15"}, 
						{role:"Support", kill:"5", death:"25", assist:"30"}],
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
			getRedTeamTotalPerformance: function() { 
			  return (this.data[1].performance + this.data[2].performance + this.data[5].performance + this.data[6].performance + this.data[9].performance)			
			},
			getBlueTeamTotalPerformance: function() { 
			  return (this.data[0].performance + this.data[3].performance + this.data[4].performance + this.data[7].performance + this.data[8].performance)			
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
			setPerformances: function() {		  
				var promises = [];
			    this.data.forEach(function a(player,index) {
					promises.push($http({
						url: 'http://localhost\:5000/players/'+encodeURIComponent(player.name),
						method: 'GET'
					})
					.then((response) => {						
						response.data.championsAffinity.forEach(function b(champion) {							
							if(champion.name==player.champion){								
								player.performance = Math.round((Math.random()*100))+champion.affinity;
							}
						});					
					}));	
				}); 
				return promises;
			},
			assignScores: function() {
				//Put a game length between 25 and 60 min
				//TODO Parametrize
				var gameLength = Math.random()*35+25;
				var killPerMinutes = Math.random()+0.05;
				var totalKills = Math.round(gameLength * killPerMinutes);		
				
				var redTeamPerformance = this.getRedTeamTotalPerformance();
				var blueTeamPerformance = this.getBlueTeamTotalPerformance();
				
				var winningTeam = (Math.random()*(redTeamPerformance+blueTeamPerformance)<redTeamPerformance ? "Red" : "Blue");			
									
				var winningTeamKillPercentageBonus = 50;
				var blueTeamKills = Math.round((totalKills*redTeamPerformance)/(redTeamPerformance+blueTeamPerformance)) 
				var redTeamKills = Math.round((totalKills*blueTeamPerformance)/(redTeamPerformance+blueTeamPerformance)) 								
											
				if(winningTeam == "Blue"){
					blueTeamKills += Math.round(blueTeamKills/10); 					
				}else{
					redTeamKills += Math.round(redTeamKills/10); 	
				}						
				
				//TODO Set Total assist multiplicator with team affinity?
				var blueTeamAssists = blueTeamKills*3;
				var redTeamAssists = redTeamKills*3;						
				
				//Set KDA percentages per blue player
				totalBlueKill = this.KDARatios[0].kill * (this.data[0].performance*100/blueTeamPerformance) + this.KDARatios[1].kill * (this.data[3].performance*100/blueTeamPerformance) + this.KDARatios[2].kill * (this.data[4].performance*100/blueTeamPerformance) + this.KDARatios[3].kill * (this.data[7].performance*100/blueTeamPerformance) + this.KDARatios[4].kill * (this.data[8].performance*100/blueTeamPerformance);
				totalBlueDeath = this.KDARatios[0].death/(this.data[0].performance*100/blueTeamPerformance) + this.KDARatios[1].death/(this.data[3].performance*100/blueTeamPerformance) + this.KDARatios[2].death/(this.data[4].performance*100/blueTeamPerformance) + this.KDARatios[3].death/(this.data[7].performance*100/blueTeamPerformance) + this.KDARatios[4].death/(this.data[8].performance*100/blueTeamPerformance);
				totalBlueAssist = this.KDARatios[0].assist * (this.data[0].performance*100/blueTeamPerformance) + this.KDARatios[1].assist * (this.data[3].performance*100/blueTeamPerformance) + this.KDARatios[2].assist * (this.data[4].performance*100/blueTeamPerformance) + this.KDARatios[3].assist * (this.data[7].performance*100/blueTeamPerformance) + this.KDARatios[4].assist * (this.data[8].performance*100/blueTeamPerformance);
					
				//Set KDA percentages per red player
				totalRedKill = this.KDARatios[0].kill * (this.data[1].performance*100/redTeamPerformance) + this.KDARatios[1].kill * (this.data[2].performance*100/redTeamPerformance) + this.KDARatios[2].kill * (this.data[5].performance*100/redTeamPerformance) + this.KDARatios[3].kill * (this.data[6].performance*100/redTeamPerformance) + this.KDARatios[4].kill * (this.data[9].performance*100/redTeamPerformance);				
				totalRedDeath = this.KDARatios[0].death/(this.data[1].performance*100/redTeamPerformance) + this.KDARatios[1].death/(this.data[2].performance*100/redTeamPerformance) + this.KDARatios[2].death/(this.data[5].performance*100/redTeamPerformance) + this.KDARatios[3].death/(this.data[6].performance*100/redTeamPerformance) + this.KDARatios[4].death/(this.data[9].performance*100/redTeamPerformance);				
				totalRedAssist = this.KDARatios[0].assist * (this.data[1].performance*100/redTeamPerformance) + this.KDARatios[1].assist * (this.data[2].performance*100/redTeamPerformance) + this.KDARatios[2].assist * (this.data[5].performance*100/redTeamPerformance) + this.KDARatios[3].assist * (this.data[6].performance*100/redTeamPerformance) + this.KDARatios[4].assist * (this.data[9].performance*100/redTeamPerformance);
				
				
				
				//Set kills for blue team						
				this.data[0].kills = Math.round(((this.KDARatios[0].kill * (this.data[0].performance*100/blueTeamPerformance))/totalBlueKill)*blueTeamKills);
				this.data[3].kills = Math.round(((this.KDARatios[1].kill * (this.data[3].performance*100/blueTeamPerformance))/totalBlueKill)*blueTeamKills);
				this.data[4].kills = Math.round(((this.KDARatios[2].kill * (this.data[4].performance*100/blueTeamPerformance))/totalBlueKill)*blueTeamKills);
				this.data[7].kills = Math.round(((this.KDARatios[3].kill * (this.data[7].performance*100/blueTeamPerformance))/totalBlueKill)*blueTeamKills);
				this.data[8].kills = Math.round(((this.KDARatios[4].kill * (this.data[8].performance*100/blueTeamPerformance))/totalBlueKill)*blueTeamKills);
				
				//Set deaths for blue team						
				this.data[0].deaths = Math.round(((this.KDARatios[0].death / (this.data[0].performance*100/blueTeamPerformance))/totalBlueDeath)*redTeamKills);
				this.data[3].deaths = Math.round(((this.KDARatios[1].death / (this.data[3].performance*100/blueTeamPerformance))/totalBlueDeath)*redTeamKills);
				this.data[4].deaths = Math.round(((this.KDARatios[2].death / (this.data[4].performance*100/blueTeamPerformance))/totalBlueDeath)*redTeamKills);
				this.data[7].deaths = Math.round(((this.KDARatios[3].death / (this.data[7].performance*100/blueTeamPerformance))/totalBlueDeath)*redTeamKills);
				this.data[8].deaths = Math.round(((this.KDARatios[4].death / (this.data[8].performance*100/blueTeamPerformance))/totalBlueDeath)*redTeamKills);								
				
				//Set assists for blue team						
				this.data[0].assists = Math.round(((this.KDARatios[0].assist * (this.data[0].performance*100/blueTeamPerformance))/totalBlueAssist)*blueTeamAssists);
				this.data[3].assists = Math.round(((this.KDARatios[1].assist * (this.data[3].performance*100/blueTeamPerformance))/totalBlueAssist)*blueTeamAssists);
				this.data[4].assists = Math.round(((this.KDARatios[2].assist * (this.data[4].performance*100/blueTeamPerformance))/totalBlueAssist)*blueTeamAssists);
				this.data[7].assists = Math.round(((this.KDARatios[3].assist * (this.data[7].performance*100/blueTeamPerformance))/totalBlueAssist)*blueTeamAssists);
				this.data[8].assists = Math.round(((this.KDARatios[4].assist * (this.data[8].performance*100/blueTeamPerformance))/totalBlueAssist)*blueTeamAssists);	
				
				//Set kills for red team						
				this.data[1].kills = Math.round(((this.KDARatios[0].kill * (this.data[1].performance*100/redTeamPerformance))/totalRedKill)*redTeamKills);
				this.data[2].kills = Math.round(((this.KDARatios[1].kill * (this.data[2].performance*100/redTeamPerformance))/totalRedKill)*redTeamKills);
				this.data[5].kills = Math.round(((this.KDARatios[2].kill * (this.data[5].performance*100/redTeamPerformance))/totalRedKill)*redTeamKills);
				this.data[6].kills = Math.round(((this.KDARatios[3].kill * (this.data[6].performance*100/redTeamPerformance))/totalRedKill)*redTeamKills);
				this.data[9].kills = Math.round(((this.KDARatios[4].kill * (this.data[9].performance*100/redTeamPerformance))/totalRedKill)*redTeamKills);	
				
				//Set deaths for red team						
				this.data[1].deaths = Math.round(((this.KDARatios[0].death / (this.data[1].performance*100/redTeamPerformance))/totalRedDeath)*blueTeamKills);
				this.data[2].deaths = Math.round(((this.KDARatios[1].death / (this.data[2].performance*100/redTeamPerformance))/totalRedDeath)*blueTeamKills);
				this.data[5].deaths = Math.round(((this.KDARatios[2].death / (this.data[5].performance*100/redTeamPerformance))/totalRedDeath)*blueTeamKills);
				this.data[6].deaths = Math.round(((this.KDARatios[3].death / (this.data[6].performance*100/redTeamPerformance))/totalRedDeath)*blueTeamKills);
				this.data[9].deaths = Math.round(((this.KDARatios[4].death / (this.data[9].performance*100/redTeamPerformance))/totalRedDeath)*blueTeamKills);	
				
				//Set assists for red team						
				this.data[1].assists = Math.round(((this.KDARatios[0].assist * (this.data[1].performance*100/redTeamPerformance))/totalRedAssist)*redTeamAssists);
				this.data[2].assists = Math.round(((this.KDARatios[1].assist * (this.data[2].performance*100/redTeamPerformance))/totalRedAssist)*redTeamAssists);
				this.data[5].assists = Math.round(((this.KDARatios[2].assist * (this.data[5].performance*100/redTeamPerformance))/totalRedAssist)*redTeamAssists);
				this.data[6].assists = Math.round(((this.KDARatios[3].assist * (this.data[6].performance*100/redTeamPerformance))/totalRedAssist)*redTeamAssists);
				this.data[9].assists = Math.round(((this.KDARatios[4].assist * (this.data[9].performance*100/redTeamPerformance))/totalRedAssist)*redTeamAssists);					
				
				//TODO verify amount of kills and equalize				
				return winningTeam;
			
			}
		};	
	});
};

