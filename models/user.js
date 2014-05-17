
module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define('User', {
    facebookId: DataTypes.BIGINT, 
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Project),
        User.hasMany(models.Fav)
      }
    }
  });
 
  return User;
};