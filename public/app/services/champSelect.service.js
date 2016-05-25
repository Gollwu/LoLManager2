module.exports = function(app) {
   app.factory('champSelectService', function($http, champSelectConfigService){
	    return {
			blueTeam: [{
			  name: '',
			  champion: '',			  
			  role: 'Top',			  
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0,
			},{
			  name: '',
			  champion: '',			 	
			  role: 'Jungler',				  
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0
			},{
			  name: '',
			  champion: '',			  
			  role: 'Mid',		
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0
			},{
			  name: '',
			  champion: '',			  
		      role: 'Marksman',
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0
			},{
			  name: '',
			  champion: '',			 
			  role: 'Support',	
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0			
			}],
			redTeam: [{
			  name: '',
			  champion: '',			
			  role: 'Top',			  
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0,
			},{
			  name: '',
			  champion: '',			  	
			  role: 'Jungler',				  
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0
			},{
			  name: '',
			  champion: '',			
			  role: 'Mid',		
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0
			},{
			  name: '',
			  champion: '',			  
		      role: 'Marksman',
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0
			},{
			  name: '',
			  champion: '',			 
			  role: 'Support',	
			  performance:0,
			  kills:0,
			  deaths:0,
			  assists:0			
			}],			
			//ID of the player currently picking
			playerPickingValues:[["blue",0],["red",0],["red",1],["blue",1],["blue",2],["red",2],["red",3],["blue",3],["blue",4],["red",4]],
			playerPicking:"",			
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
					for (i = 0; i < 5; i++) { 
						this.blueTeam[i].name = response.data[i].name;
					}				    
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
					for (i = 0; i < 5; i++) { 
						this.redTeam[i].name = response.data[i].name;
					}			
				})
				.catch((err) => {
					console.log(err);
				}); 
				promises.push(promise);
				this.playerPicking = this.playerPickingValues[0]
				return promises	
			},
			//get player pucking name and increment player picking
			getPlayerPicking: function() {
				return (this.playerPicking[0]=="blue" ? this.blueTeam[this.playerPicking[1]].name : this.redTeam[this.playerPicking[1]].name)
			},	
			isChampSelectFinished: function() {						
				return (this.playerPicking == this.playerPickingValues[9]);
			},
			//Set next value of playerPicking
			incrementPlayerPicking: function() {							
				this.playerPicking = this.playerPickingValues[this.playerPickingValues.indexOf(this.playerPicking)+1];				
			},				
			//Receives a player name and a champions name and assign the champion to the player
			updatePlayerChampion: function(name, champion) {			 
			    this.blueTeam.forEach(function myFunction(player) {
					if(player.name==name){
						player.champion = champion;
					}
				}); 
				this.redTeam.forEach(function myFunction(player) {
					if(player.name==name){
						player.champion = champion;
					}
				}); 
			},			
			//Return a list of players names for red team
			getRedTeamPlayersName: function() {		  
			  var redPlayersName = [];
			  redPlayersName.push(this.redTeam[0].name);
			  redPlayersName.push(this.redTeam[1].name);
			  redPlayersName.push(this.redTeam[2].name);
			  redPlayersName.push(this.redTeam[3].name);
			  redPlayersName.push(this.redTeam[4].name);
			  return redPlayersName;
			},
			//Return a list of players names for red team
			getBlueTeamPlayersName: function() {		  
			  var bluePlayersName = [];
			  bluePlayersName.push(this.blueTeam[0].name);
			  bluePlayersName.push(this.blueTeam[1].name);
			  bluePlayersName.push(this.blueTeam[2].name);
			  bluePlayersName.push(this.blueTeam[3].name);
			  bluePlayersName.push(this.blueTeam[4].name);
			  return bluePlayersName;
			},
			//Return a list of player objects for red team
			getRedTeamPlayers: function() {	 
			  return this.redTeam;
			},
			//TODO Function to add values
			getRedTeamTotalPerformance: function() { 
				var total = 0;
				for (i = 0; i < 5; i++) { 
					 total += this.redTeam[i].performance;
				}
			    return total;		
			},
			getRedTeamTotalDeaths: function() { 
				var total = 0;
				for (i = 0; i < 5; i++) { 
					 total += this.redTeam[i].deaths;
				}
			    return total;			
			},
			getRedTeamTotalKills: function() { 
				var total = 0;
				for (i = 0; i < 5; i++) { 
					 total += this.redTeam[i].kills;
				}
			    return total;		
			},
			getBlueTeamTotalPerformance: function() { 
				var total = 0;
				for (i = 0; i < 5; i++) { 
					 total += this.blueTeam[i].performance;
				}
			    return total;			
			},
			getBlueTeamTotalDeaths: function() { 
				var total = 0;
				for (i = 0; i < 5; i++) { 
					 total += this.blueTeam[i].deaths;
				}
			    return total;		
			},
			getBlueTeamTotalKills: function() { 
				var total = 0;
				for (i = 0; i < 5; i++) { 
					 total += this.blueTeam[i].kills;
				}
			    return total;			
			},			
			//Return a list of player objects for blue team
			getBlueTeamPlayers: function() {		  
				return this.blueTeam;
			},
			
			//Set the affinities of the players with their champion once champ select is done
			setPerformances: function() {		  
				var promises = [];
			    this.blueTeam.forEach(function a(player,index) {
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
				this.redTeam.forEach(function a(player,index) {
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
				//Randomize game length and kill per minute
				var gameLength = Math.random() *(champSelectConfigService.getGameMaxLength()-champSelectConfigService.getGameMinLength())+champSelectConfigService.getGameMinLength();				
				var killPerMinutes = Math.random() *(champSelectConfigService.getKillPerMinuteMax()-champSelectConfigService.getKillPerMinuteMin())+champSelectConfigService.getKillPerMinuteMin();
											
				var totalKills = Math.round(gameLength * killPerMinutes);					
				
				var redTeamPerformance = this.getRedTeamTotalPerformance();
				var blueTeamPerformance = this.getBlueTeamTotalPerformance();
				
				var winningTeam = (Math.random()*(redTeamPerformance+blueTeamPerformance)<redTeamPerformance ? "Red" : "Blue");			
									
				//Calcluate kill per team depending on total perforance
				var blueTeamKills = Math.round((totalKills*redTeamPerformance)/(redTeamPerformance+blueTeamPerformance)) 
				var redTeamKills = Math.round((totalKills*blueTeamPerformance)/(redTeamPerformance+blueTeamPerformance)) 								
							
				//Add a few kills to the winning team
				if(winningTeam == "Blue"){
					blueTeamKills += Math.round(blueTeamKills * champSelectConfigService.getWinningTeamKillBonus()); 					
				}else{
					redTeamKills += Math.round(redTeamKills* champSelectConfigService.getWinningTeamKillBonus()); 	
				}						
												
				//TODO Set Total assist multiplicator with team affinity?
				var blueTeamAssists = blueTeamKills*champSelectConfigService.getKillAssistRatio();
				var redTeamAssists = redTeamKills*champSelectConfigService.getKillAssistRatio();						
				
				//Set KDA percentage totals per team
				var totalBlueKill = 0;
				var totalBlueDeath = 0;
				var totalBlueAssist = 0;
				var totalRedKill = 0;
				var totalRedDeath = 0;
				var totalRedAssist = 0;
				for (i = 0; i < 5; i++) {
					totalBlueKill += this.KDARatios[i].kill * (this.blueTeam[i].performance*100/blueTeamPerformance)
					totalBlueDeath += this.KDARatios[i].death/(this.blueTeam[i].performance*100/blueTeamPerformance) 
					totalBlueAssist += this.KDARatios[i].assist * (this.blueTeam[i].performance*100/blueTeamPerformance)
					
					totalRedKill += this.KDARatios[i].kill * (this.redTeam[i].performance*100/redTeamPerformance)
					totalRedDeath += this.KDARatios[i].death/(this.redTeam[i].performance*100/redTeamPerformance) 
					totalRedAssist += this.KDARatios[i].assist * (this.redTeam[i].performance*100/redTeamPerformance)
				}
				
				
				//Set scores for both teams
				for (i = 0; i < 5; i++) {	
					this.blueTeam[i].kills = Math.round(((this.KDARatios[i].kill * (this.blueTeam[i].performance*100/blueTeamPerformance))/totalBlueKill)*blueTeamKills);
					this.blueTeam[i].deaths = Math.round(((this.KDARatios[i].death / (this.blueTeam[i].performance*100/blueTeamPerformance))/totalBlueDeath)*redTeamKills);
					this.blueTeam[i].assists = Math.round(((this.KDARatios[i].assist * (this.blueTeam[i].performance*100/blueTeamPerformance))/totalBlueAssist)*blueTeamAssists);
					this.redTeam[i].kills = Math.round(((this.KDARatios[i].kill * (this.redTeam[i].performance*100/redTeamPerformance))/totalRedKill)*redTeamKills);
					this.redTeam[i].deaths = Math.round(((this.KDARatios[i].death / (this.redTeam[i].performance*100/redTeamPerformance))/totalRedDeath)*blueTeamKills);
					this.redTeam[i].assists = Math.round(((this.KDARatios[i].assist * (this.redTeam[i].performance*100/redTeamPerformance))/totalRedAssist)*redTeamAssists);
				}			
								
				this.alignScores();		
				
				//TODO verify amount of kills and equalize				
				return winningTeam;
			
			},
			//Equalize deaths and kills on opposite teams
			alignScores: function() {
				while(this.getBlueTeamTotalDeaths() > this.getRedTeamTotalKills()){
					maxRedKillsPlayer = this.redTeam.reduce(function(max, x) {
						return x.kills > max.kills ? x : max;
					})
					maxRedKillsPlayer.kills++;
				}
				while(this.getBlueTeamTotalDeaths() < this.getRedTeamTotalKills()){
					minBlueDeathsPlayer = this.blueTeam.reduce(function(min, x) {
						return x.deaths < min.deaths ? x : min;
					})
					minBlueDeathsPlayer.deaths++;
				}
				while(this.getRedTeamTotalDeaths() > this.getBlueTeamTotalKills()){
					maxBlueKillsPlayer = this.blueTeam.reduce(function(max, x) {
						return x.kills > max.kills ? x : max;
					})
					maxBlueKillsPlayer.kills++;
				}
				while(this.getRedTeamTotalDeaths() < this.getBlueTeamTotalKills()){
					minRedDeathsPlayer = this.redTeam.reduce(function(min, x) {
						return x.deaths < min.deaths ? x : min;
					})
					minRedDeathsPlayer.deaths++;
				}
			}
		};	
	});
};

