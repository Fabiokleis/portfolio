// Update with your config settings.
require('dotenv').config({path:'/home/urameshi/ports_/portfolio/src/.env'});


module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: process.env.HOST,
      database: process.env.DBNAME,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD
    }
  },

};
