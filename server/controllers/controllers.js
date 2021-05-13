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
  let queryString = `SELECT JSON_OBJECT(
    'id', product.id,
    'name', product.name,
    'slogan', product.slogan,
    'description', product.description,
    'category', product.category,
    'default_price', product.default_price,
    'features', (select json_arrayagg
      (json_object(
        'feature', features.feature,
        'value', features.value))
      FROM features WHERE features.product_id = product.id)
    ) FROM product AS product WHERE id=${req.params.product_id}`;
  con.query(queryString, (err, productData) => {
    if (err) {
      res.status(500);
      res.end();
    } else {
      let key = Object.keys(productData[0])[0];
      res.send(JSON.parse(productData[0][key]));
    }
  });
};

const stylesHandler = (req, res) => {
  let queryString = `SELECT JSON_OBJECT(
    'product_id', product.id,
    'results', (select json_arrayagg
      (json_object(
        'style_id', styles.id,
        'name', styles.name,
        'original_price', styles.original_price,
        'sale_price', styles.sale_price,
        'default?', styles.default_style,
        'photos', (select json_arrayagg
                    (json_object(
                      'thumbnail_url', photos.thumbnail_url,
                      'url', photos.url
                  ))
                  FROM photos WHERE photos.styleid = styles.id),
        'skus', (select json_objectagg(
                      skus.id, json_object(
                        'quantity', skus.quantity,
                        'size', skus.size
                      )
                    )
                  FROM skus WHERE skus.styleId = styles.id)
      ))
      FROM styles WHERE styles.productId = product.id)
    ) FROM product AS product WHERE id=${req.params.product_id}`;
  con.query(queryString, (err, productData) => {
    if (err) {
      res.status(500);
      res.end();
      console.log(err);
    } else {
      let key = Object.keys(productData[0])[0];
      res.send(JSON.parse(productData[0][key]));
    }
  });
};

const relatedHandler = (req, res) => {
  let queryString = `SELECT JSON_ARRAYAGG(related_product_id) AS related FROM related where current_product_id = ${req.params.product_id}`;
  // let queryString = `SELECT group_concat(related_product_id) FROM related where current_product_id = ${req.params.product_id}`;
  con.query(queryString, (err, relatedData) => {
    if (err) {
      res.status(500);
      res.end();
      console.log(err);
    } else {
      res.send(JSON.parse(relatedData[0]['related']));
    }
  });
};

exports.productsHandler = productsHandler;
exports.productHandler = productHandler;
exports.stylesHandler = stylesHandler;
exports.relatedHandler = relatedHandler;