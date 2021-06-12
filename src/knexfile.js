// Update with your config settings.

console.log(process.env.HOST);
console.log(process.env.DBNAME);
console.log(process.env.DBUSER);
console.log(process.env.DBPASSWORD);
module.exports = {

  development: {
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
