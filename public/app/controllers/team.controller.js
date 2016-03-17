module.exports = function(app) {
    app.controller('TeamCtrl', ($scope, $http) => {
        // get teams from server
        $scope.teams = ['Team Solo Jefe', 'Daoulas Team'];
        $scope.init = function() {
            $http({
                url: 'http://localhost:5000/teams',
                method: 'GET'
            })
            .then((response) => {
                // infinite loop calling this
                console.log(response.data);
                for(var ii = 0; ii < response.data.length; ii++) {
                    $scope.teams.push(response.data[ii]);
                }
            })
            .catch((err) => {
                console.log(err);
            });  
        };
    });
};

