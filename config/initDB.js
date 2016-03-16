var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

var consoleLogger = require('../app/logger/logger');
var Promise = require('promise');

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");

var Player = require('../app/models/player.model'),
    Champion = require('../app/models/champion.model');
	
var promiseConnDB = mongoose.connect('mongodb://' + config.database.host + config.database.port + config.database.db);
promiseConnDB
    .then(() => {
        consoleLogger.info('Connected to db');
    
        // Wait for all entries to be saved
        var promises = setupDB();
        Promise.all(promises)
            .then(() => {
                consoleLogger.info('Data init successful.');
                process.exit(0);
            })
            .catch((err) => {
                consoleLogger.info('Failed to open a connection to database or save data. ', err);
                process.exit(1)
            });
    })
    .catch((err) => {
        consoleLogger.info('Failed to open a connection to database or save data. ', err);
        process.exit(1);
    });


function setupDB() {
    consoleLogger.info('In setupDB');
    var promises = [];
    var promise = {};
    
    var player1 = new Player({
        name: "Jefe",
        team: "TeamSoloJefe",
        championsAffinity: [{name: "Rammus", affinity: 100}],
        playersAffinity: [{name: "Daoulas", affinity: 12}]
    });
    promise = player1.save();
    promises.push(promise);

    var player2 = new Player({
        name: "Daoulas",
        team: "TeamSoloJefe",
        championsAffinity: [{name: "Rammus", affinity: 12}],
        playersAffinity: [{name: "Daoulas", affinity: 11}]
    });
    promise = player2.save();
    promises.push(promise);

    var champion1 = new Champion({ name: "Rammus", strength:100 });
    promise = champion1.save();
    promises.push(promise);       
            
    return promises;
}

/*function setupDB() {
    consoleLogger.info('In setupDB');
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
}	*/





