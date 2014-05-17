
var controllers = require('./controllers');

module.exports = function(app) {

  app.get('/', controllers.index);
  app.get('/search', controllers.search);
  app.post('/project', controllers.project_add);
  app.get('/project/:id', controllers.project_view);
  app.post('/project/:id', controllers.project_edit);
  app.post('/project/:id/step', controllers.project_step_add);
  app.get('/project/:id/step/:step', controllers.project_step_view);
  app.post('/project/:id/step/:step', controllers.project_step_edit);
  app.post('/project/:id/step/:step/add-photo', controllers.project_step_photo_add);
  app.post('/auth/facebook', controllers.auth_facebook);
  app.get('/account/favs', controllers.account_favs);
  app.get('/account/profile', controllers.account_profile);

};