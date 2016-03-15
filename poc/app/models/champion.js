var mongoose = require('mongoose');

var Champion = mongoose.Schema({
    name: String,
    ap: Number,
    ad: Number
});

module.exports = Champion;