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

const queryDatabase = (sql) => {
  try{
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, result) => {
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

// sql constructors:
const getRecordsSQL = "SELECT * FROM record";

const getCartSQL = (user_id) =>  `SELECT * FROM record_cart INNER JOIN cart_item ON record_cart.cart_id = cart_item.cart_id INNER JOIN record ON record.record_id = cart_item.record_id WHERE user_id = ${user_id}`;

const putCartSQL = (qtyToAdd, priceToAdd, user_id) => {
  return `UPDATE record_cart SET total_items = total_items + ${qtyToAdd}, total_price = total_price + ${priceToAdd} WHERE user_id = ${user_id}`;
}

const postCartItemSQL = (record_id) => `INSERT INTO cart_item(record_id, cart_id) VALUES (${record_id}, 1)`;

const putCartItemSQL = (record_id, qtyChange) => `UPDATE cart_item SET quantity = quantity + ${qtyChange} WHERE record_id = ${record_id}`;

const deleteCartItemSQL = (record_id) => `DELETE FROM cart_item WHERE record_id = ${record_id}`;


// methods
const queryGetCart = (user_id) => {
  return queryDatabase(getCartSQL(user_id));
};

const queryPutCart = (qtyToAdd, priceToAdd, user_id) => {
  return queryDatabase(putCartSQL(qtyToAdd, priceToAdd, user_id))
};

const queryRecords = () => {
  return queryDatabase(getRecordsSQL);
};

const queryPostCartItem = (record_id) => {
  return queryDatabase(postCartItemSQL(record_id));
};

const queryPutCartItem = (record_id, qtyChange) => {
  return queryDatabase(putCartItemSQL(record_id, qtyChange));
}

const queryDeleteCartItem = (record_id) => {
  return queryDatabase(deleteCartItemSQL(record_id));
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









