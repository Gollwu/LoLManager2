var mongoose = require('mongoose');

var Champions = mongoose.Schema({
    name: String,
    ap: Number,
    ad: Number
});

module.exports = Champions;