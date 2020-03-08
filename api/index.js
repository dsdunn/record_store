const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const { cartService } = require('./services/cartService');
const { productService } = require('./services/productService');

const baseUrl = '/api/v1/'


app.get(`${baseUrl}cart`, async (req, res) => {
  let result = await cartService.getCart();
  res.status(200).json(result);
})

app.get(`${baseUrl}products`, async (req, res) => {
  let result = await productService.getRecords()
  res.status(200).json(result);
})

app.get('*', async (req,res) => {
  res.send('Welcome to Dude\'s Records! The api endpoine it at http://localhost:8080/api/v1');
});

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('app running on port ' + port);
})