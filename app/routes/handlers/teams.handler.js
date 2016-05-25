/*
 *  Callbacks called after receiving a request
 */
var consoleLogger = require('../../logger/logger');

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

Handler.prototype.getPlayersByTeam = function(req, res) {
    req.database.models.Player.find({
        team: req.params.teamid
    }, 'name team playersAffinity championsAffinity')
    .then((result) => {
		consoleLogger.info(result);
        res.send(result);
    })
    .catch((err) => {
        consoleLogger.error(err);
        res.status(500).send('Unable to access players.');
    });
};

module.exports = new Handler();