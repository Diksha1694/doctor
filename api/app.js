
var express    = require('express');      
var app        = express();               
var bodyParser = require('body-parser');
var config = require('./config/config');
var http=require('http');

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
var session = require('client-sessions');

app.use(session({
  cookieName: 'session',
  secret: 'testsecret',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
    http : 'false'
}));
app.set('views', __dirname + '/public');
app.set('view engine','hjs');

app.engine('hjs', require('hogan-express'));


app.use(express.static(__dirname + './../app/'));

var routers = require('./routes/routes');
routers.set(app);


app.listen(5000);
console.log('Magic happens on port 5000');


