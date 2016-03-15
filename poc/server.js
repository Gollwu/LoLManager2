var consoleLogger = require('./app/logger/logger');

function createServer() {
    var Express = require('express'),
    morgan = require('morgan');

    var app = Express();
    
    if(process.env.NODE_ENV !== 'test')
        app.use(morgan('dev'));
    
    // routes definition
    require('./app/routes/routes')(app);

    var server = 
        app.listen(5000, () => {
            consoleLogger.info('Server listening on port ', 5000);
        });
    
    return server;
}

if(process.env.NODE_ENV === 'test'){
    // override log methods to not display anything in the console, is there a better way to do this?
    consoleLogger.info = consoleLogger.error = consoleLogger.log = consoleLogger.warn = function(){};
    module.exports = createServer;
}
else{
    createServer();  
}
