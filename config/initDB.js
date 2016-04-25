var Mongoose = require("mongoose"),
    Promise = require('promise'),
    Schema = Mongoose.Schema,
    relationship = require("mongoose-relationship"),
	consoleLogger = require('../app/logger/logger'),	
    env = process.env.NODE_ENV || 'development',
    config = require('./config')[env];	


var Player = require('../app/models/player.model')(Mongoose),
	Champion = require('../app/models/champion.model')(Mongoose);	
	
//Config for the init of the DB, please remember to empty the tables before launching the script.
var championAmount = 130; //Max allChampionsNames.length (128 currently)
var playerAmount = 10; //Max allPlayerNames.length (20 currently)
var onetoHundredAttributesChampions = ["strength"];
var onetoHundredAttributesPlayers = [];
var playerAffinitiestoChampions = 130; //Max championAmount
var playerAffinitiestoPlayers = 9; //Max playerAmount-1
var teamNumbers = 2; //Min 1, Max 2

//Arrays with names for champions and players
var allChampionsNames = ["Aatrox","Ahri","Akali","Alistar","Amumu","Anivia","Annie", "Ashe", "Aurelion Sol", "Azir","Bard","Blitzcrank","Brand","Braum","Caitlyn","Cassiopeia","Cho'Gath","Corki","Darius","Diana","Dr. Mundo","Draven","Ekko","Elise","Evelynn","Ezreal","Fiddlesticks","Fiora","Fizz", "Galio", "Gangplank","Garen","Gnar","Gragas","Graves","Hecarim","Heimerdinger","Illaoi","Irelia","Janna","Jarvan IV", "Jax", "Jayce","Jhin","Jinx","Kalista","Karma","Karthus","Kassadin","Katarina","Kayle","Kennen","Kha'zix","Kindred","Kog'Maw","LeBlanc","Lee Sin","Leona","Lissandra","Lucian","Lulu","Lux","Malphite","Malzahar","Maokai","Master Yi","Miss Fortune","Mordekaiser","Morgana","Nami","Nasus","Nautilus","Nidalee","Nocturne","Nunu","Olaf","Orianna","Pantheon","Poppy","Quinn","Rammus","Rek'Sai","Renekton","Rengar","Riven","Rumble","Ryze","Sejuani","Shaco","Shen","Shyvana","Singed","Sion","Sivir","Skarner","Sona","Soraka","Swain","Syndra","Talon","Tahm Kench","Taric","Teemo","Thresh","Tristana","Trundle","Tryndamere","Twisted Fate","Twitch","Udyr","Urgot","Varus","Vayne","Veigar","Vel'koz","Vi","Viktor","Vladimir","Volibear","Warwick","Wukong","Xerath","Xin Zhao","Yasuo","Yorick","Zac","Zed","Ziggs","Zilean","Zyra"];
var allPlayerNames = ["ElJefe","Gollwu","Hycariss","DaoulaS","Qrthur","Vaulkh","lardon","ostracil","Nene","Nerevar","Darryck","le joueur francais","GroBen","azexpli","Sowerdski","Kraki","Kraku","pseudo@", "test", "Collot"];
var allTeamNames = ["Team Solo Jefe", "Counter Daoulas Gaming"];	

var promise = setupMongoose();
promise
	.then(() => {
		consoleLogger.info('DB connection and setup successful.');
		//process.exit(0);
	})
	.catch((err) => {	
		console.log(err);		
		consoleLogger.info('Failed to open a connection to database or to create the server. ', err);
		process.exit(1);
	});



// define models and open a connection with MongoDB instance
function setupMongoose() {
    var promise =
        new Promise((fulfill, reject) => {
            try{
                
                var promiseDBConn = Mongoose.connect('mongodb://' + config.database.host + config.database.port + config.database.db); 					
                promiseDBConn
                    .then(() => {
						var promises = setupDB();
						Promise.all(promises)
							.then(() => {
								fulfill();
							})
							.catch((err) => {
								reject(err);
							});						
                    }) 
                    .catch((err) => {
                        reject(err);
                    });
            } 
            catch(err) {
                reject(err);    
            }
        });
    return promise;
}

function setupDB() {	
    consoleLogger.info('In setupDB');
    var promises = [];
    var promise = {};
	
	for (var i = 0; i < playerAmount ; i++) { 
		var player = new Mongoose.models.Player({
			name: allPlayerNames[i],
			team: allTeamNames[i%teamNumbers],
			championsAffinity: [],
			playersAffinity: []
		});
		for (var j = 0; j < playerAffinitiestoChampions ; j++) { 
			player.championsAffinity.push({name: allChampionsNames[j], affinity: Math.round(100*Math.random())});
		}
		for (var j = 0; j < playerAffinitiestoPlayers+1 ; j++) { 
			if(player.name!=allPlayerNames[j]){
				player.playersAffinity.push({name: allPlayerNames[j], affinity: Math.round(100*Math.random())});
			}	
		}
		for (var j = 0; j < onetoHundredAttributesPlayers ; j++) { 
			player[onetoHundredAttributesPlayers[j]] =  Math.round(100*Math.random());
		}
		
		promise = player.save();
		promises.push(promise);
	}

	for (var i = 0; i < championAmount ; i++) { 
		var champion = new Mongoose.models.Champion({ name: allChampionsNames[i], strength: Math.round(100*Math.random()) });
		for (var j = 0; j < onetoHundredAttributesChampions ; j++) { 
			champion[onetoHundredAttributesChampions[j]] =  Math.round(100*Math.random());
		}
		promise = champion.save();
		promises.push(promise);
	}      
            
    return promises;
}