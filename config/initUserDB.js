var models = require('../app/models/UserDB/'),
	config = require('./config')[env]
	consoleLogger = require('../app/logger/logger');

	
//Config for the init of the DB, please remember to empty the tables before launching the script.
var userAmount = 2; //Max allChampionsNames.length (128 currently)

//Arrays with names for champions and players
var allUsernames = ["Gollwu","Hycariss","Vaulkh","Nerevar"];
var allPasswords = ["Imgod2627","douglas","sgnekgnsesn232","Nerevar"];

var promises = setupDB();
promise.all(Promises)
	.then(() => {
		consoleLogger.info('DB connection and setup successful.');
		//process.exit(0);
	})
	.catch((err) => {	
		console.log(err);		
		consoleLogger.info('Failed to open a connection to database or to setup the values', err);
		process.exit(1);
	});
	
models.sequelize.sync().then(function () {
	consoleLogger.info('DB connection and setup successful.');
});



function setupDB() {	
    consoleLogger.info('Setting up the values');
    var promises = [];
    var promise = {};
	
	for (var i = 0; i < playerAmount ; i++) { 
		var player = new Mongoose.models.Player({
		
		});	
		
		promise = player.save();
		promises.push(promise);
	}

	
            
    return promises;
}