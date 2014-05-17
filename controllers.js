
var models = require('./models');
var controllers = {};

// Hardcodeta
models.Slide = {};
models.Slide.getAll = function() {
  return [{
    image: 'slide_1.jpg',
    title: 'Reciclemos entre todos',
    description: 'Pensá Verde es una plataforma online en la que podemos aprender reciclando entre todos.',
    button: {
      text: 'Buscar proyectos',
      link: config.baseUrl + 'search'
    }
  },{
    image: 'slide_2.jpg',
    title: 'Compartí tu experiencia',
    description: 'Publicar un proyecto en Pensá Verde es muy fácil e intuitivo. Podés hacerlo desde una computadora, tableta o celular.',
    button: {
      text: 'Publicar un proyecto',
      link: '#'
    }
  },{
    image: 'slide_3.jpg',
    title: 'No hace falta registrarse',
    description: 'Para ver los proyectos no hace falta registrarse. Y para votar o publicar un proyecto, podés iniciar sesión a través de tu cuenta de Facebook.',
    button: {
      text: 'Iniciar sesión ahora',
      link: config.baseUrl + 'auth/facebook'
    }
  }];
};


controllers.index = function(req, res) {

  var slides = models.Slide.getAll();

  var topTen = models.Project.getTopTen(function(topTen) {
    res.render('index', {
      slides: slides,
      topTen: topTen,
      passport: req.session.passport
    });
  });

};

controllers.search = function(req, res) {

  var keywords = req.param('keywords', '');

  models.Project.findAll({ where: ["title LIKE ?", '%'+keywords+'%'] }).success(function(results){
    res.render('search', {
      keywords: keywords,
      results: results,
      passport: req.session.passport
    });
  });
};

controllers.project_create = function(req, res) { 
  
  if(req.body) {
    models.Project.create(req.body).success(function(project) {
      res.redirect('/project/');
    });
  } else {
    res.render('project_create');
  }

};

controllers.project_view = function(req, res) {

  var id = req.params.id;

  if(id) {

    var project = models.Project.find(id).success(function(project) {
      res.redirect('/project/' + id + '/step/intro');
    });

  } else {
    res.send(404, 'Not found');
  }

};

controllers.project_edit = function(req, res) { // POST

  var id = req.params.id;

  if(id) {

    if(req.body) {
      models.Step.update(req.body).success(function(step) {

      });
    }

    models.Project.find(id).success(function(project) {
      res.render('project_edit', {
        project: project
      });
    });

  } else {
    res.send(404, 'Not found');
  }

};

controllers.project_step_add = function(req, res) { // POST
  var id = req.params.id;
  var step = req.params.step;

  if(id) {

    models.Project.find(id).success(function(project) {

    });

    if(req.body) {
      models.Step.create(req.body).success(function(step) {

      });
    }

    models.Step.find({ where: { projectId: project.id, step: step }}).success(function(currentStep) {
      res.render('project_step_add', {
        project: project,
        step: currentStep
      });
    });

  } else {
    res.send(404, 'Not found');
  }
};

controllers.project_step_create = function(req, res) {
  res.render('project_step_create');
};

controllers.project_step_view = function(req, res) {

  var id = req.params.id;
  var step = req.params.step;

  if(id) {

    models.Project.find(id).success(function(project) {

      models.Step.find({ where: { projectId: project.id, step: step }}).success(function(currentStep) {
        res.render('project_step_view', {
          project: project,
          step: currentStep
        });
      });

    });

  } else {
    res.send(404, 'Not found');
  }

};

controllers.project_step_edit = function(req, res) { // POST

  var id = req.params.id;
  var step = req.params.step;

  if(id) {

    models.Project.find(id).success(function(project) {

      models.Step.find({ where: { projectId: project.id, step: step }}).success(function(currentStep) {

        if(req.body) {
          models.Step.update(req.body).success(function(step) {

          });
        }

        res.render('project_step_edit', {
          project: project,
          step: currentStep
        });

      });

    });

  } else {
    res.send(404, 'Not found');
  }
};

controllers.project_step_photo_add = function(req, res) { // POST

  var id = req.params.id;
  var step = req.params.step;

  if(id) {

    models.Project.find(id).success(function(project) {
      models.Step.find({ where: { projectId: project.id, step: step }}).success(function(currentStep) {

        if(req.files) {

          fs.readFile(req.files.stepImage.path, function(err, data) {
            var basePath = __dirname + '/public';
            var path = '/uploads/' + id + '_' + step + '_' + stepImage.name;

            fs.writeFile(basePath + path, data, function(err) {
              if(models.Step.addPhoto(path)) {
                res.json({ status: 'ok' });
              }
            });
          });
        }
      });
    });

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

controllers.logout = function(req, res) {
  req.session = null;
  req.session.destroy();
  res.redirect('/');
};

module.exports = controllers;
