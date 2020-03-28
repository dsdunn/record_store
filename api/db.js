const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10,
  host     : process.env.DATABASE_HOST,
  user     : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD
});

const connect = () => {
  pool.getConnection(function(err, connection) {
    try {
      connection.query('USE record_cart', function (error, results, fields) {
        console.log('connected as id ' + connection.threadId);
        connection.release();

        if (error) throw error;
      });
    } catch (err) {
      console.log('connection failed: ' + err);
      setTimeout(() => {
        connect();
      }, 4500)
    }
  });
}

const queryDatabase = (sql, args) => {
  try{
    return new Promise((resolve, reject) => {
      pool.query(sql, args, (err, result) => {
        if (err) {
          connect(); //in case db closed connection due to idle timeout
          reject(err);
        }
        resolve(result);
      })
    })
  } catch(err) {
    console.log('query error: ', + err);
  }
} 

const SQL = {
  getRecords: "SELECT * FROM record",
  getCart: `SELECT * FROM record_cart INNER JOIN cart_item ON record_cart.cart_id = cart_item.cart_id INNER JOIN record ON record.record_id = cart_item.record_id WHERE user_id = ?`,
  putCart: `UPDATE record_cart SET total_items = total_items + ?, total_price = total_price + ? WHERE user_id = ?`,
  postCartItem: `INSERT INTO cart_item(record_id, cart_id) VALUES (?, 1)`,
  putCartItem: `UPDATE cart_item SET quantity = quantity + ? WHERE record_id = ?`,
  deleteCartItem: `DELETE FROM cart_item WHERE record_id = ?`
}


// methods
const queryGetCart = (user_id) => {
  return queryDatabase(SQL.getCart, user_id);
};

const queryPutCart = (qtyToAdd, priceToAdd, user_id) => {
  return queryDatabase(SQL.putCart, [qtyToAdd, priceToAdd, user_id])
};

const queryRecords = () => {
  return queryDatabase(SQL.getRecords);
};

const queryPostCartItem = (record_id) => {
  return queryDatabase(SQL.postCartItem , [record_id]);
};

const queryPutCartItem = (qtyChange, record_id) => {
  return queryDatabase(SQL.putCartItem, [record_id, qtyChange]);
}

const queryDeleteCartItem = (record_id) => {
  return queryDatabase(SQL.deleteCartItem, [record_id]);
}

connect();

module.exports = {
  queryGetCart,
  queryPutCart,
  queryRecords,
  queryPostCartItem,
  queryPutCartItem,
  queryDeleteCartItem
}









