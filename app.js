
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    morgan  = require('morgan'),
    serveStatic = require('serve-static'),
    http = require('http'),
    swig = require('swig')
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('./config'),
    controllers = require('./controllers'),
    routes = require('./routes'),
    models = require('./models');


app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
app.use(morgan('dev'));
app.use(bodyParser());
app.use(serveStatic(__dirname + '/public'));
app.use(cookieParser());
app.use(session(config.session));
app.use(passport.initialize());

swig.setDefaults({ cache: false });

passport.use(new FacebookStrategy(config.facebook, controllers.auth_facebook_add));

passport.serializeUser(function(user, done) {
  done(null, JSON.stringify(user));
});

passport.deserializeUser(function(user, done) {
  done(null, JSON.parse(user));
});

routes(app, passport);

models.sequelize
  .sync({ force: true })
  .complete(function(err) {
    if(err) {
      throw err[0];
    } else {
      app.listen(3000);
    }
  });

process.on('uncaughtException', function(err){
  console.log(err);
});

