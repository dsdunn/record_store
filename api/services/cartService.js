const db = require('../db');

const { queryCart } = db;

// const getCart = () => {
//   return queryCart();
// }

const cartService = class {
  static getCart = () => {
    return queryCart();
  }
}

module.exports = {
  cartService
}