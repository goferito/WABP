
var express = require('express')
  , bodyParser = require('body-parser')
  , morgan = require('morgan')
  , cookieParser = require('cookie-parser')
  , path = require('path')
  

var auth = require('./controllers/auth')
  , pizzas = require('./controllers/pizzas')
  , reqs = require('./controllers/reqs')
  

var app = express()
  , PORT = process.env.PORT || 3000


// Set up express server
app.set('trust proxy', 1);
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname + '/public')));



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



var server = app.listen(PORT, function(){
  console.log('Listening on port', server.address().port);
});
