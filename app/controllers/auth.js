
var config = require('../config')

var me = module.exports = {};

me.authenticate = function(req, res, next){
  if(req.cookies[config.secrets.cookieName] !== config.secrets.cookieValue)
    return res.redirect('/zugang');
  next();
};


me.renderAccess = function(req, res){
  res.render('accessForm');
};


me.validate = function(req, res){
  if(req.body.user === config.secrets.userName
     && req.body.pass === config.secrets.userPass){
    res.cookie( config.secrets.cookieName
              , config.secrets.cookieValue
              , { maxAge: config.ageSessionCookie
                , httpOnly: true });
    res.redirect('/');
  }else{
    res.send("I don't know who you are... ¬¬");
  }
};
