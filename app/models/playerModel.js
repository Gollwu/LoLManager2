var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
    name: String,
    team: String,
    championsAffinity: [
        {
            name: String, 
            affinity: Number
        },
        {
            _id: false
        }
    ],
    playersAffinity: [
        {
            name: String, 
            affinity: Number
        },
        {
            _id: false
        }
    ],
    {
        _id: false
    }
});

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;