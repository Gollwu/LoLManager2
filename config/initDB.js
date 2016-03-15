var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

var consoleLogger = require('../app/logger/logger');
var Promise = require('promise');

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");
	
mongoose.connect('mongodb://' + config.database.host + config.database.port + config.database.db);

Player = require('../app/models/playerModel'),
Champion = require('../app/models/championModel');

var promise = setupDB();
promise
	.then(() => {
		consoleLogger.info('DB connection and init successful.');				
	})
	.catch((err) => {
		consoleLogger.info('Failed to open a connection to database or save data. ', err);
		process.exit(1)
	});
	
function setupDB() {
    var promise =
        new Promise((fulfill, reject) => {
            try{
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
                fulfill();
            } 
            catch(err) {
                reject(err);    
            }
        });
    return promise;
}	





