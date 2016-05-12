var app = angular.module('LoLManager', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/champSelect');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('champSelect', {
            url: '/champSelect',
            templateUrl: 'champSelect.html',
			controler : 'ChampionSelectCtrl',
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('gameResults', {
            url: '/gameResults',
            templateUrl: 'gameResults.html', 
			controler : 'ResultsCtrl',			
        });
        
});
   


// bind controllers
require('./controllers/champSelect.controller')(app);
require('./controllers/results.controller')(app);

//bind directives
require('./directives/champSelect.directive')(app);

//bind services
require('./services/champSelect.service')(app);
require('./services/champions.service')(app);

