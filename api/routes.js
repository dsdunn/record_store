const routes = require('express').Router();
const baseUrl = '/api/v1/'

const { cartService } = require('./services/cartService');
const { productService } = require('./services/productService');

routes.get(`${baseUrl}cart`, async (req, res) => {
  let { user_id } = req.query;
  let result = await cartService.getCart(user_id);
  res.status(200).json(result);
})

routes.get(`${baseUrl}products`, async (req, res) => {
  let result = await productService.getRecords()
  res.status(200).json(result);
})

routes.get('*', async (req,res) => {
  res.send('Welcome to Dude\'s Records! The api endpoine it at http://localhost:8080/api/v1');
});

routes.route(`${baseUrl}cart_item`)
  .post(async (req, res) => {
  let { record_id, user_id, price_to_add } = req.query;
  let cartResult = [];

  try {
    await cartService.postCartItem(record_id);
    await cartService.putCart(1, price_to_add, user_id);
    cartResult = await cartService.getCart(user_id);
  } catch (err) {
    if (err) throw err;
  }
  res.status(201).json(cartResult);
}).put(async (req, res) => {
  let { record_id, user_id, price_to_add, item_quantity_change } = req.query;
  let cartResult = [];

  try {
    await cartService.putCartItem(record_id, item_quantity_change);
    await cartService.putCart(item_quantity_change, price_to_add, user_id);
    cartResult = await cartService.getCart(user_id);
  } catch (err) {
    if (err) throw err;
  }
  res.status(200).json(cartResult);
}).delete(async (req, res) => {
  let { record_id, user_id, price_to_add, item_quantity_change } = req.query;
  let cartResult = [];

  try {
    await cartService.deleteCartItem(record_id);
    await cartService.putCart(item_quantity_change, price_to_add, user_id);
    cartResult = await cartService.getCart(user_id);
  } catch (err) {
    if (err) throw err;
  }
  res.status(200).json(cartResult);
})

module.exports = routes;