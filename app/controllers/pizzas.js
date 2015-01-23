
var me = module.exports = require('./Base.js')('pizzas');

var Pizza = require('../models/Pizza')
  , config = require('../config')
  

// Add specific controller functions or overwrite the generic ones
// adquired in Base
