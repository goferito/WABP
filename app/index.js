
var express = require('express')
  , bodyParser = require('body-parser')
  , morgan = require('morgan')
  , cookieParser = require('cookie-parser')
  , path = require('path')
  

var auth = require('./controllers/auth')
  , pizzas = require('./controllers/pizzas')
  , reqs = require('./controllers/reqs')
  

var app = express()
  , http = require('http').Server(app)
  , io = require('socket.io')(http)
  , PORT = process.env.PORT || 3000


// Socket.io stuff
require('./io')(io);


// Set up express server
app.set('trust proxy', 1);
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname + '/../build')));



/*************
 *          *
 *  Routes  *
 *          *
 * **********/

app.get('/zugang'
  , auth.renderAccess);
app.post('/zugang'
  , auth.validate);

app.get('/'
  , auth.authenticate
  , function(req, res){
    res.render('landing');
  });

app.get('/pizzas'
  , pizzas.loadLast
  , pizzas.renderList);



http.listen(PORT, function(){
  console.log('Listening on port', PORT);
});
