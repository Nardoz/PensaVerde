
var models = {};


models.Project = {};

models.Project.create = function(body) {

};

models.Project.update = function(body) {

};

models.Project.findById = function(id) {
  return {};
};

models.Project.getTopTen = function() {
  return {};
};
models.Project.findAllByKeywords = function(keywords) {
  return [];
};



models.ProjectStep = {};

models.ProjectStep.create = function(body) {
  return {};
};

models.ProjectStep.update = function(body) {
  return {};
};

models.ProjectStep.findByProject = function(project, step) {
  return {};
};



models.User = {};

models.User.findOrCreate = function(params, callback) {
  callback(false, params);
};




module.exports = models;