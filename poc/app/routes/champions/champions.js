/*
 *  Callbacks called after receiving a request
 */

var Handler = function() {};

Handler.prototype.getChampions = function(req, res) {
    res.send({});//TODO 
};

module.exports = new Handler();