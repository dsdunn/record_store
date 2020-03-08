const sql_db = require('../db');
const { queryRecords } = sql_db;

const productService = class {
  static getRecords = () => {
    return queryRecords();
  }
}

module.exports = {
  productService
}