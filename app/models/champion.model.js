var mongoose = require('mongoose');

var championSchema = mongoose.Schema({
    name: String,
    strength: Number
});

module.exports = function(db) {
    db.model('Champion', championSchema);
};