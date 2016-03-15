var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
    name: String,
    team: String,
    championsAffinity: [{name: String, affinity: Number}],
    playersAffinity: [{name: String, affinity: Number}]
});

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;