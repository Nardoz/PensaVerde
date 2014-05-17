
var controllers = {};

controllers.home = function(req, res) {

  var slides = [{
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

  res.render('index', {
    slides: slides
  });

};

module.exports = controllers;
