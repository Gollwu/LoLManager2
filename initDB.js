var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");
	
mongoose.connect('mongodb://' + config.database.host + config.database.port + config.database.db);

var playerSchema = mongoose.Schema({
    name: String
});

var Player = mongoose.model('Player', playerSchema);

var player1 = new Player({ name: 'Jeff' });
player1.save();

var player2 = new Player({ name: 'Hycariss' });
player2.save();

var player3 = new Player({ name: 'Kraki' });
player3.save();

var player4 = new Player({ name: 'Djambi' });
player4.save();

var player5 = new Player({ name: 'Nene' });
player5.save();

var player6 = new Player({ name: 'Qrthur' });
player6.save();

var player7 = new Player({ name: 'Azexpli' });
player7.save();

var player8 = new Player({ name: 'Darryck' });
player8.save();

var player9 = new Player({ name: 'Ostra' });
player9.save();

var player10 = new Player({ name: 'test' });
player10.save();

var championSchema = mongoose.Schema({
    name: String
});

var Champion = mongoose.model('Champion', championSchema);

var champion1 = new Champion({ name: 'Aatrox' });
champion1.save();

var champion2 = new Champion({ name: 'Ahri' });
champion2.save();

var champion3 = new Champion({ name: 'Annie' });
champion3.save();

var champion4 = new Champion({ name: 'Hecarim' });
champion4.save();

var champion5 = new Champion({ name: 'Olaf' });
champion5.save();

var champion6 = new Champion({ name: 'Kog\'Maw' });
champion6.save();

var champion7 = new Champion({ name: 'Riven' });
champion7.save();

var champion8 = new Champion({ name: 'Thresh' });
champion8.save();

var champion9 = new Champion({ name: 'Fiddlesticks' });
champion9.save();

var champion10 = new Champion({ name: 'Blitzcrank' });
champion10.save();

// dont think Mongo schema as a usual relational DB, we can directly store an array of affinity in Player collection, even if data is stored several times
var playerChampionSchema = mongoose.Schema({ 
    champion: { type:Schema.ObjectId, ref:"Champion"},
	player: { type:Schema.ObjectId, ref:"Champion"},
	affinity: String
});

var PlayerChampion = mongoose.model('PlayerChampion', playerChampionSchema);
var champion10 = new PlayerChampion({ affinity: "100", champion:champion1._id, player:player1._id });
champion10.save();

// best part (#bashreview)
// even better store it in JSON file and run a script to init the DB 
var players = [{name: 'Jeff'},
              {name: 'Daou'},
              {name: 'Grrrr'}];
players.forEach((player, index) => {
    var tmp = new Player(player);
    tmp.save();
});

