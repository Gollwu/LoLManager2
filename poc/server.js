var SimpleLogger = require('simple-node-logger');

var consoleLogger = SimpleLogger.createSimpleLogger();

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