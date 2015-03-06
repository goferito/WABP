
var me = module.exports = {};

var Req = require('../models/Pizza')



me.save = function(r){
  r.something_else = 'extra cheese';
  Req.insert(r, function(){});
};


//TODO create a module with the generic functions,
//     most of the times the code is pretty much the same
me.load = function(req, res, next){
  Req.getByName(req.pizza._id, function(err, pizzas){
    if(err) return next(err);
    req.reqs = reqs;
    next();
  });
};


me.render = function(req, res){
  var out = {
    ingredients: req.ingredients || {}
  };

  res.render('requests', out);
};
