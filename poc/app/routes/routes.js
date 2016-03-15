/**
    Expose API routes 
*/
var consoleLogger = require('../logger/logger');

module.exports = function(app) {

    app.get('/champions', (req, res) => {
        res.send({});//TODO    
    });
    
    app.get('/players', (req, res) => {
        res.send({});//TODO    
    });
    
    app.get('/teams/:teamid', (req, res) => {
        res.send({id:req.params.teamid});//TODO     
    });
    
    app.get('/players/:playerid', (req, res) => {
        res.send({id: req.params.playerid});//TODO    
    });
    
    app.get('/players/:playerid/affinityPlayer/:otherplayerid', (req, res) => {
        res.send([{id:req.params.playerid},{id:req.params.otherplayerid}]);//TODO    
    });
    
    app.get('/players/:playerid/affinityChampion/:championid', (req, res) => {
        res.send([{id:req.params.playerid},{id:req.params.championid}]);//TODO    
    });
    
};