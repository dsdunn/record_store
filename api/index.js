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
  let { user_id } = req.query;
  let result = await cartService.getCart(user_id);
  res.status(200).json(result);
})

app.get(`${baseUrl}products`, async (req, res) => {
  let result = await productService.getRecords()
  res.status(200).json(result);
})

app.get('*', async (req,res) => {
  res.send('Welcome to Dude\'s Records! The api endpoine it at http://localhost:8080/api/v1');
});

app.post(`${baseUrl}cart_item`, async (req, res) => {
  let { record_id, user_id, price_to_add } = req.query;
  let cartResult;
  try {
    await cartService.postCartItem(record_id);
    await cartService.putCart(1, price_to_add, user_id);
    cartResult = await cartService.getCart(user_id);
  } catch (err) {
    if (err) throw err;
  }
  res.status(200).json(cartResult);
})

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('app running on port ' + port);
})