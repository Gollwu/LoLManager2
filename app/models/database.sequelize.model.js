var sequelize = require('sequelize');

var databaseSchema = {
    Id: sequelize.INTEGER,
	Name: sequelize.STRING,
	DatabseHashedPassword: sequelize.STRING
}

module.exports = function(db) {
    var Database = sequelize.define('Database', databaseSchema);	
};