const sql_db = require('../db');
const { queryCart } = sql_db;

const cartService = class {
  static getCart = () => {
    return queryCart();
  }
}

module.exports = {
  cartService
}