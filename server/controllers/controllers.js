const con = require('../../mySQL/mySQL.js');

const productsHandler = (req, res) => {
  let count = req.query.count === undefined ? 5 : req.query.count;
  let queryString = `SELECT * FROM product LIMIT ${count}`;
  con.query(queryString, (err, rows) => {
    if (err) {
      res.status(500);
      res.end();
    } else {
      res.send(rows);
    }
  });
};

exports.productsHandler = productsHandler;