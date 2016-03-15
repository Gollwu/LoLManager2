/**
    Expose API routes 
*/
var consoleLogger = require('../logger/logger');

module.exports = function(app) {

    app.get('/players', (req, res) => {
        res.send({});
    });
    
    app.get('/players/:playerid', (req, res) => {
        res.send({id: req.params.playerid});
    });
    
    app.get('/players/:playerid/affinityPlayer/:otherplayerid', (req, res) => {
        res.send([{id:req.params.playerid},{id:req.params.otherplayerid}]);
    });
    
    app.get('/players/:playerid/affinityChampion/:championid', (req, res) => {
        res.send([{id:req.params.playerid},{id:req.params.championid}]);
    });
    
};