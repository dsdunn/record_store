const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const { cartService } = require('./services/cartService');

app.use(bodyParser.json());
app.use(cors());


app.get('*', async (req,res) => {
  let result = await cartService.getCart();
  console.log(result);
  res.status(200).json(result);
});

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('app running on port ' + port);
})