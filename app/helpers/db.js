
var mongo = require('mongoskin')

var config = require('../config')
  , db = mongo.db(config.db.mongoSrv,
                  {native_parser: true})


// Bind the collection in the config, so they are
// available in through this module
config.db.collections.forEach(function(coll){
  db.bind(coll)
});


module.exports = db;

