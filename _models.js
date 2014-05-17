var test = {
  slides: [{
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
  }],

  projects: [{
    id: 1,
    title: 'Farolitos de frasco',
    introduction: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea.',
    image: 'faroles_de_frascos.jpg',
    views: 10,
    favs: 5
  },{
    id: 2,
    title: 'Macetas de lata',
    introduction: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea.',
    image: 'macetas_de_lata.jpg',
    views: 20,
    favs: 15
  }]
};


var models = {};


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
    }],

    projects: [{
      id: 1,
      title: 'Farolitos de frasco',
      introduction: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea.',
      image: 'faroles_de_frascos.jpg',
      views: 10,
      favs: 5
    },{
      id: 2,
      title: 'Macetas de lata',
      introduction: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea.',
      image: 'macetas_de_lata.jpg',
      views: 20,
      favs: 15
    }]
  };
};



models.Project = {};

models.Project.create = function(body) {

};

models.Project.update = function(body) {

};

models.Project.findById = function(id) {
  return {};
};

models.Project.getTopTen = function() {
  return test.projects;
};
models.Project.findAllByKeywords = function(keywords) {
  return test.projects;
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
