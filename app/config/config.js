
/*
 * Default configuration values
 */
module.exports = {
// Secret values, ignored in .gitignore
  secrets: require('../../secrets')

//DB Configuration
, db: {
    // String the for the mongodb connection
    mongoSrv: 'mongodb://localhost/pizzas_db'

    // Collections to be binded on the db helper module
  , collections: ['pizzas', 'test_coll', 'test2']
  }

// Milliseconds before the cookie session expires
, ageSessionCookie: 365 * 24 * 60 * 60 * 1000 // 1 year

// Number of elements per page
, pageLength: 30

};
