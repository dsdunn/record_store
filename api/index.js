const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(routes);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('app running on port ' + port);
})