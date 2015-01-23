
var mongoskin = require('mongoskin')

var db = require('../helpers/db')

var me = module.exports = {};


me.getLasts = function(num, cb){
  db.pizzas
    .find({}, {}, {sort: {_id: -1}, limit: num})
    .toArray(cb);
};


me.getByTrack = function(track , cb){
  db.reqs
    .find({track: track})
    .toArray(cb);
};


me.insert = function(req, cb){
  db.reqs
    .insert(req, cb)
};
