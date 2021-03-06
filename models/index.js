var fs = require('fs'),
    path = require('path'),
    lodash = require('lodash'),
    Sequelize = require('sequelize'),
    config = require('../config'),
    sequelize = new Sequelize(config.database.database, config.database.username, config.database.password),
    db = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);
