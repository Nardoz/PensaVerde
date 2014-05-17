
module.exports = function(sequelize, DataTypes) {

  var Fav = sequelize.define('Fav', {
    date: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW 
    }
  }, {
    classMethods: {
      associate: function(models) {
        Fav.belongsTo(models.User),
        Fav.belongsTo(models.Project)
      }
    }
  });
 
  return Fav;
}