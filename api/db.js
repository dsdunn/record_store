const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : process.env.DATABASE_HOST,
  user     : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD
});

const connect = () => {
  try {
    connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        setTimeout(() => {
          connect();
        }, 2500)
      }
      console.log('connected as id ' + connection.threadId);

      queryDatabase('USE record_cart'); //selecting database
    });
  } catch(err) {
    console.log(err);
  }
}

const queryDatabase = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  })
} 


// sql constructors:
const getCartSQL = 
  "SELECT * FROM record_cart INNER JOIN cart_item ON record_cart.cart_id = cart_item.cart_id INNER JOIN record ON record.record_id = cart_item.record_id";

const queryCart = () => {
  let data = queryDatabase(getCartSQL);
  return data;
}

connect();

module.exports = {
  queryCart
}









