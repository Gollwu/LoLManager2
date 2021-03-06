var consoleLogger = require('./app/logger/logger');
var Mongoose = require("mongoose"),
    Promise = require('promise');	
	
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

// for testing purposes, export method to create an instance of the server
if(process.env.NODE_ENV === 'test') {
    // override log methods to not display anything in the console, is there a better way to do this?
    consoleLogger.info = consoleLogger.error = consoleLogger.log = consoleLogger.warn = function(){};
    module.exports = createServer;
} else {
    var promise = setupMongoose();
    promise
        .then(() => {
            consoleLogger.info('DB connection and setup successful.');
            createServer();
        })
        .catch((err) => {	
			console.log(err);		
            consoleLogger.info('Failed to open a connection to database or to create the server. ', err);
            exit(1);
        });
}

function createServer() {
    var Express = require('express'),
        morgan = require('morgan'),
        app = Express();
    
    if(process.env.NODE_ENV !== 'test')
        app.use(morgan('dev'));
		
	
    
    // routes definition
    require('./app/routes/routes')(app, Mongoose);
	
	
	
    var server = 
        app.listen(5000, () => {
            consoleLogger.info('Server listening on port ', 5000);
        });
    
    return server;
}

// define models and open a connection with MongoDB instance
function setupMongoose() {
    var promise =
        new Promise((fulfill, reject) => {
            try{
                require('./app/models/champion.model')(Mongoose);
                require('./app/models/player.model')(Mongoose);
                var promiseDBConn = Mongoose.connect('mongodb://' + config.database.host + config.database.port + config.database.db);                
                promiseDBConn
                    .then(() => {
                        fulfill();
                    })
                    .catch((err) => {
                        reject(err);
                    });
            } 
            catch(err) {
                reject(err);    
            }
        });
    return promise;
}