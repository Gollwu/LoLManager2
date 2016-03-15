var mongoose = require('mongoose');

var ChampionSchema = mongoose.Schema({
    name: String,
    ap: Number,
    ad: Number
});

module.exports = ChampionSchema;