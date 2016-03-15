var mongoose = require('mongoose');

var PlayerSchema = mongoose.Schema({
    name: String,
    team: String,
    championsAffinity: [{name: String, affinity: Number}],
    playersAffinity: [{name: String, affinity: Number}]
});

module.exports = PlayerSchema;