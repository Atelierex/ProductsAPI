
var mysql = require('mysql');

var con = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'your new password',
  database: 'catwalk'
});

module.exports = con;
