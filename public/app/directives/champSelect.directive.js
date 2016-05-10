module.exports = function(app) {
	//Directive when a player press a champion image on the champ select
	app.directive("selectChamp", function(champSelectService) {
	  var linkFunction = function(scope, element, attributes) {
		var champSquare = element;
		//Display that the player clicked on this champion
		$(champSquare).on("click", function() {	
			document.getElementById(champSelectService.getPlayerPicking() + "Champion").src = this.src
		});
	  };
	  return {
		restrict: "A",
		link: linkFunction
	  };
	});
	//Directive when a player press the lock Button
	app.directive("lockButton", function(champSelectService) {
	  var linkFunction = function(scope, element, attributes) {
		var lockButton = element;		
		$(lockButton).on("click", function() {
			var playerPicking = champSelectService.getPlayerPicking();
		
			//Get Champion picked
			var extractChampionNameRegexp = /.*\/(.*)_Square_0.png/g;
			var match = extractChampionNameRegexp.exec(document.getElementById(playerPicking + "Champion").src);		
			var championPicked = match[1].replace("%20","\\ ").replace("'","\\'");	
			
			//Store in champSelectOrder the champion that has been picked	
			champSelectService.updatePlayerChampion(playerPicking,championPicked);				
			
			if(!champSelectService.isChampSelectFinished()){			
				//remove chamion picked from the list of pickable champions
				var extractChampionNameRegexp = /.*\/(.*)_Square_0.png/g;
				var match = extractChampionNameRegexp.exec(document.getElementById(playerPicking + "Champion").src);		
				var championPicked = match[1].replace("%20","\\ ").replace("'","\\'");	
				$('#'+championPicked).remove();									
				
				//Add the css to display that the player is not picking anymore
				var d = document.getElementById(playerPicking + "Champion");
				d.className = d.className.replace(" picking","");	
				
				//Change currently picking player by taking the following in scope.champSelectOrder			
				champSelectService.incrementPlayerPicking();
				
				//Add the css to display that the player is picking if players left 			
				var d = document.getElementById(champSelectService.getPlayerPicking() + "Champion");
				d.className += " picking";			
			}else{								
				//change page and launch calculations
				document.location.href = 'index.html#/gameResults'					
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
	app.directive('displayOnEnd', function($timeout) {
	  return function(scope, element, attrs) {	
		if (scope.$last){		
		   	$timeout(function(){  
				element.parent()[0].style.visibility = "visible"; 
			}, 1000);			
		}
	  };
	})

}