const express = require('express');
const app = express();
const port = 4401;
const controllers = require('./controllers/controllers.js');

app.use(express.static('public'))

app.get('/products', controllers.productsHandler);
app.get('/products/:product_id', controllers.productHandler);
app.get('/products/:product_id/styles', controllers.stylesHandler);
app.get('/products/:product_id/related', controllers.relatedHandler);


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});