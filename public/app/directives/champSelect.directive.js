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
		//First get the number of the player in champ select order
			var id;
			for(var i = 0; i < scope.champSelectOrder.length; i++) {
			   if(scope.champSelectOrder[i][0] === scope.playerPicking) {
				 id = i;
			   }
			}
			//Get Champion picked
			var extractChampionNameRegexp = /.*\/(.*)_Square_0.png/g;
			var match = extractChampionNameRegexp.exec(document.getElementById(scope.playerPicking + "Champion").src);		
			var championPicked = match[1].replace("%20","\\ ").replace("'","\\'");	
			
			//Store in champSelectOrder the champion that has been picked			
			scope.champSelectOrder[id][1] = championPicked;	
			
			
			if(id!=9){			
				//remove chamion picked from the list of pickable champions
				var extractChampionNameRegexp = /.*\/(.*)_Square_0.png/g;
				var match = extractChampionNameRegexp.exec(document.getElementById(scope.playerPicking + "Champion").src);		
				var championPicked = match[1].replace("%20","\\ ").replace("'","\\'");	
				$('#'+championPicked).remove();									
				
				//Add the css to display that the player is not picking anymore
				var d = document.getElementById(scope.playerPicking + "Champion");
				d.className = d.className.replace(" picking","");	
				
				//Change currently picking player by taking the following in scope.champSelectOrder			
				scope.playerPicking = scope.champSelectOrder[id+1][0];
				
				//Add the css to display that the player is picking if players left 			
				var d = document.getElementById(scope.playerPicking + "Champion");
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