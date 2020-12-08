const mysql = require('mysql');

const { host, user, password } = require('./db_config');

const db = mysql.createConnection({
  host,
  user,
  password
});

con.connect(function (err) {
  if (err) throw err;
  console.log('AWS MySQL Connected!');
});

module.exports = db;
