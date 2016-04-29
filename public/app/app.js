var app = angular.module('LoLManager', []);


// bind controllers
require('./controllers/team.controller')(app);
require('./controllers/champion.controller')(app);

//bind directives
require('./directives/champSelect.directive')(app);