var sequelize = require('sequelize');

var userSchema = {
    Id: sequelize.INTEGER,
	Username: sequelize.STRING,
	HashedPassword: sequelize.STRING
}

module.exports = function(db) {
    var User = sequelize.define('User', userSchema);
	
	User.hasOne(Database, {as: 'Database', foreignKey: 'DatabaseId'})
};