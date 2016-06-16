module.exports = function(sequelize, DataTypes) {
  var Database = sequelize.define("Database", {
    Id: DataTypes.STRING,
	DatabaseName: DataTypes.STRING,
	HashedDatabasePassord: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Database.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Database;
};