var mongoose = require('mongoose');

var Player = mongoose.Schema({
    name: String,
    team: String,
    championsAffinity: [{name: String, affinity: Number}],
    playersAffinity: [{name: String, affinity: Number}]
});

module.exports = Player;