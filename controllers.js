
var controllers = {};

controllers.index = function(req, res) {
  res.render('index');
};

controllers.search = function(req, res) {
  res.render('search');
};

controllers.tutorial_add = function(req, res) { // POST
  res.render('tutorial_add');
};

controllers.tutorial_view = function(req, res) {
  res.render('tutorial_view');
};

controllers.tutorial_edit = function(req, res) { // POST
  res.render('tutorial_edit');
};

controllers.tutorial_step_add = function(req, res) { // POST
  res.render('tutorial_step_add');
};

controllers.tutorial_step_view = function(req, res) {
  res.render('tutorial_step_view');
};

controllers.tutorial_step_edit = function(req, res) { // POST
  res.render('tutorial_step_edit');
};

controllers.tutorial_step_photo_add = function(req, res) { // POST
  res.render('tutorial_step_photo_add');
};

controllers.auth_facebook = function(req, res) { // POST
  res.render('auth_facebook');
};

controllers.account_favs = function(req, res) {
  res.render('account_favs');
};

controllers.account_profile = function(req, res) {
  res.render('account_profile');
};

module.exports = controllers;