/*
 *  Callbacks called after receiving a request
 */
var consoleLogger = require('../../logger/logger');

var Handler = function() {};

Handler.prototype.getChampions = function(req, res) {
    req.database.models.Champion.find({}, 'name')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        consoleLogger.error(err);
        res.status(500).send('Unable to access champions.');
    });
};
Handler.prototype.getChampionById = function(req, res) {
    req.database.models.Champion.find({name: req.params.championid}, 'name strength')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        consoleLogger.error(err);
        res.status(500).send('Unable to access champions.');
    });
};

module.exports = new Handler();