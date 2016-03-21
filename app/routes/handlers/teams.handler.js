/*
 *  Callbacks called after receiving a request
 */

var Handler = function() {};

Handler.prototype.getTeams = function(req, res) {	
	var playerModel = req.database.models.Player;
	
	playerModel.find().distinct('team', function(error, ids) {
		res.send(ids);  
	})	
};

Handler.prototype.getTeamById = function(req, res) {
    res.send({id:req.params.teamid});//TODO
};

module.exports = new Handler();