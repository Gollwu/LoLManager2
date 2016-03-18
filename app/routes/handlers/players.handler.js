/*
 *  Callbacks called after receiving a request
 */
var consoleLogger = require('../../logger/logger'),
    Player = require('../../models/player.model');

var Handler = function() {};

Handler.prototype.getPlayers = function(req, res) {
    req.database.models.Player.find({}, 'name team')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        consoleLogger.error(err);
        res.status(500).send('Unable to access players.');
    });
};

Handler.prototype.getPlayerById = function(req, res) {
    req.database.models.Player.findOne({
        name: req.params.playerid
    }, 'name team playersAffinity championsAffinity')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        consoleLogger.error(err);
        res.status(500).send('Unable to access players.');
    });
};

module.exports = new Handler();