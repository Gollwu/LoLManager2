var fs = require('fs'),
    mongo = require('mongodb'),
    consoleLogger = require('../app/logger/logger'),
    Player = require('../app/models/player'),
    Champion = require('../app/models/champion');

consoleLogger.info('Reading files...');

fs.readFile(__dirname + '/player.json', 'utf8', (err, data) => {
    if(err) {
        return consoleLogger.error(err);
    }
    consoleLogger.info('Done reading player.json');
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
    consoleLogger.info('Done reading champion.json');
    /*var champions = JSON.parse(data);
    champions.forEach((champion, index) => {
        var tmp = new Champion(champion);
        tmp.save();
    });*/
});