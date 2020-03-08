const sql_db = require('../db');
const { queryGetCart, queryPostCartItem, queryPutCartItem } = sql_db;

const cartService = class {
  static getCart = (user_id) => {
    let cartData = queryGetCart(user_id);
    return cartData;

    if (!cartData.length) {
      return [];
    }
  }

  static putCart = (qtyToAdd = 0, priceToAdd = 0, user_id = 1) => {
    return queryPutCartItem(qtyToAdd, priceToAdd, user_id);
  }

  static postCartItem = (record_id) => {
    return queryPostCartItem(record_id);
  }

  static putCartItem = (record_id, qtyChange) => {
    console.log('put_cart item: ', record_id, qtyChange);
    return queryPutCartItem(record_id, qtyChange);
  }
}

module.exports = {
  cartService
}