const express = require('express');
const app = express();
const port = 4401;
const controllers = require('./controllers/controllers.js');


app.get('/products', controllers.productsHandler);
app.get('/products/:product_id', controllers.productHandler);


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});