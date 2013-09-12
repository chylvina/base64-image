
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.set('port', process.env.PORT || 80);
//app.set('views', __dirname + '/views');
//app.set('view engine', 'hbs');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.use(express.logger('dev'));
}

app.get('/', routes.index);
app.get('/upload', routes.upload);

app.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
