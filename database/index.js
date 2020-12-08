const mysql = require('mysql');

const { host, user, password, port } = require('./config');

const db = mysql.createPool({
  host,
  user,
  password,
  port
});

/* db.connect(function (err) {
  if (err) throw err;
  console.log('AWS MySQL Connected!');
}); */

module.exports = db;
