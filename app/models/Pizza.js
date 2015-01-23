
var mongoskin = require('mongoskin')

var db = require('../helpers/db')

var me = module.exports = {};



me.getByTrack = function(track , cb){
  db.reqs
    .find({track: track})
    .toArray(cb);
};

me.insert = function(req, cb){
  db.reqs
    .insert(req, cb)
};
