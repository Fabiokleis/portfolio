const knexconf = require('../../knexfile');
const knex = require('knex')(knexconf.production);


module.exports = knex;
