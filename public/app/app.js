var app = angular.module('LoLManager', []);


// bind controllers
require('./controllers/team.controller')(app);
require('./controllers/champion.controller')(app);