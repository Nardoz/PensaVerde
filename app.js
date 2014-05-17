var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan  = require('morgan'),
    serveStatic = require('serve-static'),
    http = require('http'),
    swig = require('swig'),
    routes = require('./routes');


app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
app.use(morgan('dev'));
app.use(bodyParser());
app.use(serveStatic(__dirname + '/public'));

swig.setDefaults({ cache: false });

routes(app);

app.listen(3000);

process.on('uncaughtException', function(err){
  console.log(err);
});