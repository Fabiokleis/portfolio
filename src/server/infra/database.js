const knexconf = require('../../knexfile');
const knex = require('knex')(knexconf.development);


module.exports = knex;
