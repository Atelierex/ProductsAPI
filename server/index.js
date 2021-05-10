const express = require('express');
const app = express();
const port = 4401;
const controllers = require('./controllers/controllers.js');

app.get('/products', controllers.productsHandler);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});