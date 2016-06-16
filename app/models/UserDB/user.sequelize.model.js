module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
	Id: DataTypes.INTEGER
    Username: DataTypes.STRING
	HashedPassword: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasOne(models.Database)
      }
    }
  });

  return User;
};