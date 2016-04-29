module.exports = function(app) {
	//Directive when a player press a champion image on the champ select
	app.directive("selectChamp", function() {
	  var linkFunction = function(scope, element, attributes) {
		var champSquare = element;
		//Display that the player clicked on this champion
		$(champSquare).on("click", function() {			
			document.getElementById(scope.playerPicking + "Champion").src = this.src
		});
	  };
	  return {
		restrict: "A",
		link: linkFunction
	  };
	});
	//Directive when a player press the lock Button
	app.directive("lockButton", function() {
	  var linkFunction = function(scope, element, attributes) {
		var lockButton = element;		
		$(lockButton).on("click", function() {
			//Get Champion picked and remove it from the list of pickable champions
			var extractChampionNameRegexp = /.*\/(.*)_Square_0.png/g;
			var match = extractChampionNameRegexp.exec(document.getElementById(scope.playerPicking + "Champion").src);		
			match[1] = match[1].replace("%20","\\ ").replace("'","\\'");	
			$('#'+match[1]).remove();				
			
			//Add the css to display that the player is not picking anymore
			var d = document.getElementById(scope.playerPicking + "Champion");
			d.className = d.className.replace(" picking","");
			//Change currently picking player by taking the following in scope.champSelectOrder			
			scope.playerPicking = scope.champSelectOrder[scope.champSelectOrder.indexOf(scope.playerPicking)+1];
			
			//Add the css to display that the player is picking if players left 	
			if(scope.playerPicking!=undefined){
				var d = document.getElementById(scope.playerPicking + "Champion");
				d.className += " picking";
				//Do Shit to launch calculations	
			}
				
			
		});
	  };
	  return {
		restrict: "A",
		link: linkFunction
	  };
	});
	//Directive to display the champions to pick once they are loaded
	//Also displays the first player picking
	app.directive('displayOnEnd', function() {
	  return function(scope, element, attrs) {	
		if (scope.$last){		
		   	setTimeout(function(){  
				element.parent()[0].style.visibility = "visible"; 
			}, 1000);			
		}
	  };
	})

}