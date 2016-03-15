var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");
	
mongoose.connect('mongodb://' + config.database.host + config.database.port + config.database.db);

Player = require('../app/models/player'),
Champion = require('../app/models/champion');

var player1 = new Player({
    name: "Jefe",
    team: "TeamSoloJefe",
    championsAffinity: [{name: "Rammus", affinity: 100}],
    playersAffinity: [{name: "Daoulas", affinity: 12}]
});
player1.save();

var player2 = new Player({
    name: "Daoulas",
    team: "TeamSoloJefe",
    championsAffinity: [{name: "Rammus", affinity: 12}],
    playersAffinity: [{name: "Daoulas", affinity: 11}]
});
player2.save();

var champion1 = new Champion({ name: "Rammus", strength:100 });
champion1.save();



