var consoleLogger = require('./app/logger/logger'),
    Express = require('express'),
    morgan = require('morgan');


var app = Express();
app.use(morgan('dev'));
// routes definition
require('./app/routes/routes')(app);

app.listen(8080);


/*test*/
consoleLogger.info('test');

// override 
consoleLogger.error = function() {
    var a = 0; 
    consoleLogger.info(a+1);
};
consoleLogger.error();

function addition(a, b) {
    return a+b;
}

exports.addition = addition;

/*test*/


