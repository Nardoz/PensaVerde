
var controllers = require('./controllers');

module.exports = function(app, passport) {

  app.get('/', controllers.index);
  app.get('/search', controllers.search);
  app.get('/create-project', controllers.project_create);
  app.post('/create-project', controllers.project_create);
  //app.post('/project', controllers.project_save);
  app.get('/project/:id', controllers.project_view);
  app.post('/project/:id', controllers.project_edit);
  app.post('/project/:id/step', controllers.project_step_add);
  //app.post('/project/:id/create-step', controllers.project_step_create);
  app.get('/project/:id/step/:step', controllers.project_step_view);
  app.post('/project/:id/step/:step', controllers.project_step_edit);
  app.post('/project/:id/step/:step/add-photo', controllers.project_step_photo_add);
  app.get('/account/favs', controllers.account_favs);
  app.get('/account/profile', controllers.account_profile);
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
  app.get('/auth/facebook/logout', controllers.logout);
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/' }));

};
