
module.exports = function(sequelize, DataTypes) {

  var Project = sequelize.define('Project', {
    title: DataTypes.STRING,
    introduction: DataTypes.TEXT,
    views: DataTypes.INTEGER,
    favs: DataTypes.INTEGER,
    date: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW 
    }
  }, {
    classMethods: {
      associate: function(models) {
        Project.belongsTo(models.User),
        User.hasMany(models.Fav)
      },
      getTopTen: function(callback) {
        Project.findAll({ 
          order: 'favs DESC'
          limit: 10
        }).success(callback);
      }
    }
  });
 
  return Project;
}