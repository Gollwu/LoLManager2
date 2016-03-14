var fs = require('fs'),
    mongo = require('mongodb'),
    SimpleLogger = require('simple-node-logger');

var consoleLogger = SimpleLogger.createSimpleLogger();
consoleLogger.info('Reading file...');

fs.readFile(__dirname + '/player.json', 'utf8', (err, data) => {
    if(err) {
        return consoleLogger.error(err);
    }
    consoleLogger.info('Done');
    /*var players = JSON.parse(data);
    players.forEach((player, index) => {
        var tmp = new Player(player);
        tmp.save();
    });*/
});

fs.readFile(__dirname + '/champion.json', 'utf8', (err, data) => {
    if(err) {
        return consoleLogger.error(err);
    }
    consoleLogger.info('Done');
    /*var champions = JSON.parse(data);
    champions.forEach((champion, index) => {
        var tmp = new Champion(champion);
        tmp.save();
    });*/
});