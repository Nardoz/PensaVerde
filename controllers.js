
var models = require('./models');
var controllers = {};

controllers.index = function(req, res) {

  var topTen = models.Project.getTopTen();

  res.render('index', { 
    topTen: topTen 
  });

};

controllers.search = function(req, res) {

  var keywords = req.param('keywords', '');
  var results = [];

  if(keywords) {
    results = models.Project.findAllByKeywords(keywords);
  }

  res.render('search', {
    keywords: keywords,
    results: results
  });
};

controllers.project_add = function(req, res) { // POST

  if(req.body) {
    if(models.Project.create(req.body)) {

    }
  }

  res.render('project_add');
};

controllers.project_view = function(req, res) {

  var id = req.params.id;

  if(id) {
    var project = models.Project.findById(id);
    res.redirect('/project/' + id + '/step/intro');
  } else {
    res.send(404, 'Not found');
  }
  
};

controllers.project_edit = function(req, res) { // POST
  
  var id = req.params.id;

  if(id) {

    if(req.body) {
      if(models.ProjectStep.update(req.body)) {

      }
    }

    var project = models.Project.findById(id);

    res.render('project_edit', {
      project: project
    });

  } else {
    res.send(404, 'Not found');
  }

};

controllers.project_step_add = function(req, res) { // POST
  var id = req.params.id;
  var step = req.params.step;

  if(id) {

    var project = models.Project.findById(id);

    if(req.body) {
      if(models.ProjectStep.create(req.body)) {

      }
    }

    var currentStep = models.ProjectStep.findByProject(project, step);

    res.render('project_step_add', {
      project: project,
      step: currentStep
    });

  } else {
    res.send(404, 'Not found');
  }
};

controllers.project_step_view = function(req, res) {

  var id = req.params.id;
  var step = req.params.step;

  if(id) {
    var project = models.Project.findById(id);
    var currentStep = models.ProjectStep.findByProject(project, step);

    res.render('project_step_view', {
      project: project,
      step: currentStep
    });
  } else {
    res.send(404, 'Not found');
  }

};

controllers.project_step_edit = function(req, res) { // POST

  var id = req.params.id;
  var step = req.params.step;

  if(id) {

    var project = models.Project.findById(id);
    var currentStep = models.ProjectStep.findByProject(project, step);

    if(req.body) {
      if(models.ProjectStep.update(req.body)) {

      }
    }

    res.render('project_step_edit', {
      project: project,
      step: currentStep
    });

  } else {
    res.send(404, 'Not found');
  }
};

controllers.project_step_photo_add = function(req, res) { // POST
  
  var id = req.params.id;
  var step = req.params.step;

  if(id) {

    var project = models.Project.findById(id);
    var currentStep = models.ProjectStep.findByProject(project, step);

    if(req.files) {

      fs.readFile(req.files.stepImage.path, function(err, data) {
        var basePath = __dirname + '/public'; 
        var path = '/uploads/' + id + '_' + step + '_' + stepImage.name;
        
        fs.writeFile(basePath + path, data, function(err) {
          if(models.ProjectStep.addPhoto(path)) {
            res.json({ status: 'ok' });
          }
        });
      });
    }

    res.json({ status: 'failed' });
  } else {
    res.json({ status: 'failed' });
  }
};

controllers.auth_facebook_add = function(accessToken, refreshToken, profile, done) {
  models.User.findOrCreate({ 
    facebookId: profile.id, 
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    gender: profile.gender,
    email: profile.emails[0].value
  }, function(err, user) {
    return done(err, user);
  });
};

controllers.account_favs = function(req, res) {
  res.render('account_favs');
};

controllers.account_profile = function(req, res) {
  res.render('account_profile');
};

module.exports = controllers;