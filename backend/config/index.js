var config;

if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
  config = require('./prod');
} else {
  // we are in development - return the dev set of keys
  config = require('./dev');
}

module.exports = config;