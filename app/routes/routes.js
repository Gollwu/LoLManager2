/**
    Expose API routes 
*/
var consoleLogger = require('../logger/logger'),
    teamsRoutes = require('./teams.routes.js'),
    playersRoutes = require('./players.routes.js'),
    championsRoutes = require('./champions.routes.js'),	
    path = require('path'),
	Express = require('express');

module.exports = function(app, db) {    
    // for all routes, provide a connection to db
    app.all('*', function(req, res, next) {
        req.database = db;
        next();
    });
    app.use('/players', playersRoutes);
    app.use('/champions', championsRoutes);
    app.use('/teams', teamsRoutes);
  
    app.get('/bundle.js', (req, res) => {
        res.sendFile(path.resolve('public/build/bundle.js'));
    });
	
	app.use('/', Express.static('./public/views'));
};