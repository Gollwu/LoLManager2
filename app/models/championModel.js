var mongoose = require('mongoose');

var championSchema = mongoose.Schema({
    name: String,
    ap: Number,
    ad: Number
});

var Champion = mongoose.model('Champion', championSchema);

module.exports = Champion;