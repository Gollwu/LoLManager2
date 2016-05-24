module.exports = function(app) {
   app.factory('champSelectConfigService', function($http){
	    return {
			gameMaxLength:60,
			gameMinLength:25,
			killPerMinuteMin:1,
			killPerMinuteMax:1.1,
			winningTeamKillBonus:0.3,
			//Temporary
			killAssistRatio:3,
			
			getGameMaxLength: function() {
				return this.gameMaxLength;
			},
			getGameMinLength: function() {
				return this.gameMinLength;
			},
			getKillPerMinuteMin: function() {
				return this.killPerMinuteMin;
			},
			getKillPerMinuteMax: function() {
				return this.killPerMinuteMax;
			},
			getWinningTeamKillBonus: function() {
				return this.winningTeamKillBonus;
			},
			getKillAssistRatio: function() {
				return this.killAssistRatio;
			},			
		};
	});
};	

