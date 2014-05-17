
var models = require('./models');
var controllers = {};

// Hardcodeta
models.Slide = {};
models.Slide.getAll = function() {
  return [{
    image: 'slide_1.jpg',
    title: 'Reciclemos entre todos',
    description: 'Pensá Verde es una plataforma online en la que podemos aprender reciclando entre todos.',
    button: 'Buscar proyectos'
  },{
    image: 'slide_2.jpg',
    title: 'Compartí tu experiencia',
    description: 'Publicar un proyecto en Pensá Verde es muy fácil e intuitivo. Podés hacerlo desde una computadora, tableta o celular.',
    button: 'Publicar un proyecto'
  },{
    image: 'slide_3.jpg',
    title: 'No hace falta registrarse',
    description: 'Para ver los proyectos no hace falta registrarse. Y para votar o publicar un proyecto, podés iniciar sesión a través de tu cuenta de Facebook.',
    button: 'Iniciar sesión ahora'
  }];
};


controllers.index = function(req, res) {

  var slides = models.Slide.getAll();

  var topTen = models.Project.getTopTen(function(topTen) {
    res.render('index', {
      slides: slides,
      topTen: topTen
    });
  });
  
};

controllers.search = function(req, res) {

  var keywords = req.param('keywords', '');
  var results = [];

  results = models.Project.findAll({ where: { title: keywords } });

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
  models.User.findByFacebookOrCreate({
    facebookId: profile.id,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    gender: profile.gender,
    email: profile.emails[0].value
  }, function(user) {
    return done(null, user);
  });
};


controllers.account_profile = function(req, res) {
  res.render('account_profile');
};

controllers.account_favs = function(req, res) {
  res.render('account_favs');
};

module.exports = controllers;
