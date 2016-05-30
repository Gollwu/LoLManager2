module.exports = function(app) {
   app.service('champSelectService', function($http, champSelectConfigService){	    
		var blueTeam = [{
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
		}];
		var redTeam = [{
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
		}];		
		
		//ID of the player currently picking
		var playerPickingValues = [["blue",0],["red",0],["red",1],["blue",1],["blue",2],["red",2],["red",3],["blue",3],["blue",4],["red",4]];
		var playerPicking = "";		
		
		//Ratios of KDA by role
		var KDARatios = [{role:"Top", kill:"20", death:"25", assist:"25"}, 
					{role:"Jungler", kill:"15", death:"20", assist:"25"}, 
					{role:"Mid", kill:"30", death:"15", assist:"15"}, 
					{role:"Marksman", kill:"30", death:"15", assist:"15"}, 
					{role:"Support", kill:"5", death:"25", assist:"30"}];
					
		// Receives the name of both team and updates the player names for the champ select
		this.fillPlayers = function(blueTeamName, redTeamName) {		
			var promises = [];
			
			//Get Players from blue team
			var promise =  $http({
				url: 'teams/'+encodeURIComponent(blueTeamName)+'/players',
				method: 'GET',				
			})
			.then((response) => {
				for (i = 0; i < 5; i++) { 
					blueTeam[i].name = response.data[i].name;
				}				    
			})
			.catch((err) => {
				console.log(err);
			}); 
			promises.push(promise);
			
			//Get Players from red team
			promise = $http({
				url:  'teams/'+encodeURIComponent(redTeamName)+'/players',
				method: 'GET',				
			})
			.then((response) => {
				for (i = 0; i < 5; i++) { 
					redTeam[i].name = response.data[i].name;
				}			
			})
			.catch((err) => {
				console.log(err);
			}); 
			promises.push(promise);
			playerPicking = playerPickingValues[0]
			return promises	
		}
		
		//get player pucking name and increment player picking
		this.getPlayerPicking = function() {
			return (playerPicking[0]=="blue" ? blueTeam[playerPicking[1]].name : redTeam[playerPicking[1]].name)
		}	
		
		this.isChampSelectFinished = function() {						
			return (playerPicking == playerPickingValues[9]);
		}
		
		//Set next value of playerPicking
		this.incrementPlayerPicking = function() {							
			playerPicking = playerPickingValues[playerPickingValues.indexOf(playerPicking)+1];				
		}		
		
		//Receives a player name and a champions name and assign the champion to the player
		this.updatePlayerChampion = function(name, champion) {			 
			blueTeam.forEach(function myFunction(player) {
				if(player.name==name){
					player.champion = champion;
				}
			}); 
			redTeam.forEach(function myFunction(player) {
				if(player.name==name){
					player.champion = champion;
				}
			}); 
		}			
		
		//Return a list of players names for red team
		this.getRedTeamPlayersName = function() {		  
		  var redPlayersName = [];
		  redPlayersName.push(redTeam[0].name);
		  redPlayersName.push(redTeam[1].name);
		  redPlayersName.push(redTeam[2].name);
		  redPlayersName.push(redTeam[3].name);
		  redPlayersName.push(redTeam[4].name);
		  return redPlayersName;
		}
		//Return a list of players names for red team
		this.getBlueTeamPlayersName = function() {		  
		  var bluePlayersName = [];
		  bluePlayersName.push(blueTeam[0].name);
		  bluePlayersName.push(blueTeam[1].name);
		  bluePlayersName.push(blueTeam[2].name);
		  bluePlayersName.push(blueTeam[3].name);
		  bluePlayersName.push(blueTeam[4].name);
		  return bluePlayersName;
		}
		
		//Return a list of player objects for red team
		this.getRedTeamPlayers = function() {	 
		  return redTeam;
		}
		
		//Return a list of player objects for blue team
		this.getBlueTeamPlayers = function() {		  
			return blueTeam;
		}
		
		//TODO Function to add values
		this.getRedTeamTotalPerformance = function() {			
			var total = 0;
			for (i = 0; i < 5; i++) {
				 total += redTeam[i].performance;				
			}
			return total;		
		}
		this.getRedTeamTotalDeaths = function() { 
			var total = 0;
			for (i = 0; i < 5; i++) { 
				 total += redTeam[i].deaths;
			}
			return total;			
		}
		this.getRedTeamTotalKills = function() { 
			var total = 0;
			for (i = 0; i < 5; i++) { 
				 total += redTeam[i].kills;
			}
			return total;		
		}
		
		this.getBlueTeamTotalPerformance = function() { 
			var total = 0;
			for (i = 0; i < 5; i++) { 
				 total += blueTeam[i].performance;
			}
			return total;			
		}
		this.getBlueTeamTotalDeaths = function() { 
			var total = 0;
			for (i = 0; i < 5; i++) { 
				 total += blueTeam[i].deaths;
			}
			return total;		
		}
		this.getBlueTeamTotalKills = function() { 
			var total = 0;
			for (i = 0; i < 5; i++) { 
				 total += blueTeam[i].kills;
			}
			return total;			
		}	
		
		//Set the affinities of the players with their champion once champ select is done
		this.setPerformances = function() {		  
			var promises = [];
			blueTeam.forEach(function a(player,index) {
				promises.push($http({
					url: 'players/'+encodeURIComponent(player.name),
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
			redTeam.forEach(function a(player,index) {
				promises.push($http({
					url: 'players/'+encodeURIComponent(player.name),
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
		}
		
		this.assignScores = function() {
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
				totalBlueKill += KDARatios[i].kill * (blueTeam[i].performance*100/blueTeamPerformance)
				totalBlueDeath += KDARatios[i].death/(blueTeam[i].performance*100/blueTeamPerformance) 
				totalBlueAssist += KDARatios[i].assist * (blueTeam[i].performance*100/blueTeamPerformance)
				
				totalRedKill += KDARatios[i].kill * (redTeam[i].performance*100/redTeamPerformance)
				totalRedDeath += KDARatios[i].death/(redTeam[i].performance*100/redTeamPerformance) 
				totalRedAssist += KDARatios[i].assist * (redTeam[i].performance*100/redTeamPerformance)
			}					
			
			//Set scores for both teams
			for (i = 0; i < 5; i++) {	
				blueTeam[i].kills = Math.round(((KDARatios[i].kill * (blueTeam[i].performance*100/blueTeamPerformance))/totalBlueKill)*blueTeamKills);
				blueTeam[i].deaths = Math.round(((KDARatios[i].death / (blueTeam[i].performance*100/blueTeamPerformance))/totalBlueDeath)*redTeamKills);
				blueTeam[i].assists = Math.round(((KDARatios[i].assist * (blueTeam[i].performance*100/blueTeamPerformance))/totalBlueAssist)*blueTeamAssists);
				redTeam[i].kills = Math.round(((KDARatios[i].kill * (redTeam[i].performance*100/redTeamPerformance))/totalRedKill)*redTeamKills);
				redTeam[i].deaths = Math.round(((KDARatios[i].death / (redTeam[i].performance*100/redTeamPerformance))/totalRedDeath)*blueTeamKills);
				redTeam[i].assists = Math.round(((KDARatios[i].assist * (redTeam[i].performance*100/redTeamPerformance))/totalRedAssist)*redTeamAssists);
			}			
							
			this.alignScores();		
			
			//TODO verify amount of kills and equalize				
			return winningTeam;
		
		}
		
		//Equalize deaths and kills on opposite teams
		this.alignScores = function() {			
			while(this.getBlueTeamTotalDeaths() > this.getRedTeamTotalKills()){
				maxRedKillsPlayer = redTeam.reduce(function(max, x) {
					return x.kills > max.kills ? x : max;
				})
				maxRedKillsPlayer.kills++;
			}
			while(this.getBlueTeamTotalDeaths() < this.getRedTeamTotalKills()){
				minBlueDeathsPlayer = blueTeam.reduce(function(min, x) {
					return x.deaths < min.deaths ? x : min;
				})
				minBlueDeathsPlayer.deaths++;
			}
			while(this.getRedTeamTotalDeaths() > this.getBlueTeamTotalKills()){
				maxBlueKillsPlayer = blueTeam.reduce(function(max, x) {
					return x.kills > max.kills ? x : max;
				})
				maxBlueKillsPlayer.kills++;
			}
			while(this.getRedTeamTotalDeaths() < this.getBlueTeamTotalKills()){
				minRedDeathsPlayer = redTeam.reduce(function(min, x) {
					return x.deaths < min.deaths ? x : min;
				})
				minRedDeathsPlayer.deaths++;
			}
		}			
	});
};

