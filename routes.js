
var controllers = require('./controllers');

module.exports = function(app) {

  app.get('/', controllers.index);
  app.get('/search', controllers.search);
  app.post('/tutorial', controllers.tutorial_add);
  app.get('/tutorial/:id', controllers.tutorial_view);
  app.post('/tutorial/:id', controllers.tutorial_edit);
  app.post('/tutorial/:id/step', controllers.tutorial_step_add);
  app.get('/tutorial/:id/step/:step', controllers.tutorial_step_view);
  app.post('/tutorial/:id/step/:step', controllers.tutorial_step_edit);
  app.post('/tutorial/:id/step/:step/add-photo', controllers.tutorial_step_photo_add);
  app.post('/auth/facebook', controllers.auth_facebook);
  app.get('/account/favs', controllers.account_favs);
  app.get('/account/profile', controllers.account_profile);

};