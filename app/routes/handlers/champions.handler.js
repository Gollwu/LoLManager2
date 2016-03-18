/*
 *  Callbacks called after receiving a request
 */
var consoleLogger = require('../../logger/logger'),
    Champion = require('../../models/champion.model');

var Handler = function() {};

Handler.prototype.getChampions = function(req, res) {
    req.database.models.Champion.find({}, 'name')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        consoleLogger.error(err);
        res.status(500).send('Unable to access players.');
    });
};
Handler.prototype.getChampionById = function(req, res) {
    req.database.models.Champion.find({name: req.params.championid}, 'name strength')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        consoleLogger.error(err);
        res.status(500).send('Unable to access players.');
    });
};

module.exports = new Handler();