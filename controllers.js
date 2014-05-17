
var models = require('./models');
var controllers = {};

controllers.index = function(req, res) {

  var topTen = models.Tutorial.getTopTen();

  res.render('index', { 
    topTen: topTen 
  });

};

controllers.search = function(req, res) {

  var keywords = req.param('keywords', '');
  var results = [];

  if(keywords) {
    results = models.Tutorial.findAllByKeywords(keywords);
  }

  res.render('search', {
    keywords: keywords,
    results: results
  });
};

controllers.tutorial_add = function(req, res) { // POST

  if(req.body) {
    if(models.Tutorial.create(req.body)) {

    }
  }

  res.render('tutorial_add');
};

controllers.tutorial_view = function(req, res) {

  var id = req.params.id;

  if(id) {
    var tutorial = models.Tutorial.findById(id);
    res.redirect('/tutorial/' + id + '/step/intro');
  } else {
    res.send(404, 'Not found');
  }
  
};

controllers.tutorial_edit = function(req, res) { // POST
  
  var id = req.params.id;

  if(id) {

    if(req.body) {
      if(models.TutorialStep.update(req.body)) {

      }
    }

    var tutorial = models.Tutorial.findById(id);

    res.render('tutorial_edit', {
      tutorial: tutorial
    });

  } else {
    res.send(404, 'Not found');
  }

};

controllers.tutorial_step_add = function(req, res) { // POST
  var id = req.params.id;
  var step = req.params.step;

  if(id) {

    var tutorial = models.Tutorial.findById(id);

    if(req.body) {
      if(models.TutorialStep.create(req.body)) {

      }
    }

    var currentStep = models.TutorialStep.findByTutorial(tutorial, step);

    res.render('tutorial_step_add', {
      tutorial: tutorial,
      step: currentStep
    });

  } else {
    res.send(404, 'Not found');
  }
};

controllers.tutorial_step_view = function(req, res) {

  var id = req.params.id;
  var step = req.params.step;

  if(id) {
    var tutorial = models.Tutorial.findById(id);
    var currentStep = models.TutorialStep.findByTutorial(tutorial, step);

    res.render('tutorial_step_view', {
      tutorial: tutorial,
      step: currentStep
    });
  } else {
    res.send(404, 'Not found');
  }

};

controllers.tutorial_step_edit = function(req, res) { // POST

  var id = req.params.id;
  var step = req.params.step;

  if(id) {

    var tutorial = models.Tutorial.findById(id);
    var currentStep = models.TutorialStep.findByTutorial(tutorial, step);

    if(req.body) {
      if(models.TutorialStep.update(req.body)) {

      }
    }

    res.render('tutorial_step_edit', {
      tutorial: tutorial,
      step: currentStep
    });

  } else {
    res.send(404, 'Not found');
  }
};

controllers.tutorial_step_photo_add = function(req, res) { // POST
  
  var id = req.params.id;
  var step = req.params.step;

  if(id) {

    var tutorial = models.Tutorial.findById(id);
    var currentStep = models.TutorialStep.findByTutorial(tutorial, step);

    if(req.files) {

      fs.readFile(req.files.stepImage.path, function(err, data) {
        var basePath = __dirname + '/public'; 
        var path = '/uploads/' + id + '_' + step + '_' + stepImage.name;
        
        fs.writeFile(basePath + path, data, function(err) {
          if(models.TutorialStep.addPhoto(path)) {
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