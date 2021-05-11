const con = require('../../mySQL/mySQL.js');

const productsHandler = (req, res) => {
  let count = req.query.count === undefined ? 5 : req.query.count;
  let queryString = `SELECT * FROM product LIMIT ${count}`;
  con.query(queryString, (err, productsData) => {
    if (err) {
      res.status(500);
      res.end();
    } else {
      res.send(productsData);
    }
  });
};

const productHandler = (req, res) => {
  let queryString = `
  SELECT JSON_OBJECT('id', product.id,'name', product.name,'slogan', product.slogan,'description', product.description,'category', product.category, 'default_price', product.default_price, 'features', (select json_arrayagg(json_object('feature', features.feature,'value', features.value)) FROM features WHERE features.product_id = product.id) ) FROM product AS product WHERE id=${req.params.product_id}`;
  con.query(queryString, (err, productData) => {
    if (err) {
      res.status(500);
      res.end();
    } else {
      let key = Object.keys(productData[0])[0];
      res.send(productData[0][key]);
    }
  });
};

exports.productsHandler = productsHandler;
exports.productHandler = productHandler;