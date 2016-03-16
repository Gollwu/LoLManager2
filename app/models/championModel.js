var mongoose = require('mongoose');

var championSchema = mongoose.Schema({
    name: String,
    strength: Number,   
    {
        _id: false
    }
});

var Champion = mongoose.model('Champion', championSchema);

module.exports = Champion;