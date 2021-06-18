// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: process.env.HOST,
      database: process.env.DBNAME,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.HOST,
      database: process.env.DBNAME,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      ssl: {"rejectUnauthorized": false}
    }
  },

};
