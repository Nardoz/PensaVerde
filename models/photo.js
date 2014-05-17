
module.exports = function(sequelize, DataTypes) {

  var Photo = sequelize.define('Photo', {
    path: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Photo.belongsTo(models.Step)
      }
    }
  });
 
  return Photo;
}