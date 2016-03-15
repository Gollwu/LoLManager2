/*
 *  Callbacks called after receiving a request
 */

var Handler = function() {};

Handler.prototype.getPlayers = function(req, res) {
    res.send({});//TODO 
};

Handler.prototype.getPlayerById = function(req, res) {
    res.send({id:req.params.playerid});//TODO
};

Handler.prototype.getAffinityToPlayer = function(req, res) {
    res.send([{id:req.params.playerid},{id:req.params.otherplayerid}]);//TODO
};

Handler.prototype.getAffinityToChampion = function(req, res) {
    res.send([{id:req.params.playerid},{id:req.params.championid}]);//TODO
};

module.exports = new Handler();