var mongoose = require('mongoose');

var championSchema = mongoose.Schema({
    name: String,
    strength: Number
});

module.exports = mongoose.model('Champion', championSchema);