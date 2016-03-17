/*
 *  Callbacks called after receiving a request
 */

var Handler = function() {};

Handler.prototype.getTeams = function(req, res) {
    //res.send({name:'Team Solo Jefe'});
    res.send([
        {name: 'Team Solo Jefe lel'},
        {name: 'Daoulas lel'}
    ]);//TODO 
};

Handler.prototype.getTeamById = function(req, res) {
    res.send({id:req.params.teamid});//TODO
};

module.exports = new Handler();