var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
    name: String,
    team: String,
    championsAffinity: [
        {
            name: String, 
            affinity: Number,
            _id: false
        }
    ],
    playersAffinity: [
        {
            name: String, 
            affinity: Number,
            _id: false
        }
    ]
});

module.exports = function(db) {
    db.model('Player', playerSchema);
};