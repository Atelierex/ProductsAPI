
var mysql = require('mysql');

var con = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your new password',
  database: 'catwalk'
});

module.exports = con;
