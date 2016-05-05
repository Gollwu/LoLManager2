var app = angular.module('LoLManager', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/champSelect');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('champSelect', {
            url: '/champSelect',
            templateUrl: 'champSelect.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('gameResults', {
            url: '/gameResults',
            templateUrl: 'gameResults.html' 
        });
        
});
   


// bind controllers
require('./controllers/team.controller')(app);
require('./controllers/champion.controller')(app);
require('./controllers/results.controller')(app);

//bind directives
require('./directives/champSelect.directive')(app);