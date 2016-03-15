/*
 *  Callbacks called after receiving a request
 */

var Handler = function() {};

Handler.prototype.getTeams = function(req, res) {
    res.send({});//TODO 
};

Handler.prototype.getTeamById = function(req, res) {
    res.send({id:req.params.teamid});//TODO
};

module.exports = new Handler();