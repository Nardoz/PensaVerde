
module.exports = function(sequelize, DataTypes) {

  var Step = sequelize.define('Step', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    step: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Step.belongsTo(models.Step),
        Step.hasMany(models.Photo)
      }
    }
  });
 
  return Step;
}