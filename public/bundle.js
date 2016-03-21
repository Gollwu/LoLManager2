(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = angular.module('LoLManager', []);


// bind controllers
require('./controllers/team.controller')(app);
},{"./controllers/team.controller":2}],2:[function(require,module,exports){
module.exports = function(app) {
    app.controller('TeamCtrl', ($scope, $http) => {
        // get teams from server
        $scope.teams = [];	
        $scope.init = function() {					
            $http({
                url: 'http://localhost\:5000/teams',
                method: 'GET'
            })
            .then((response) => {
                //TODO Case not 2 teams ?               
				$scope.firstTeam = response.data[0];
				$scope.secondTeam = response.data[1];				
                for(var ii = 0; ii < response.data.length; ii++) {
                    $scope.teams.push(response.data[ii]);
                }
				
				$http({
                url: 'http://localhost\:5000/getPlayersByTeam',
                method: 'GET',
				params: {teamId: $scope.firstTeam}
				})
				.then((response) => {
					$scope.BS = response.data;               
				})
				.catch((err) => {
					console.log(err);
				}); 
            })				
            .catch((err) => {
                console.log(err);
            });  
        };	
    });
};


},{}]},{},[1]);
