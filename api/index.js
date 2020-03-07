const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('*', (req,res) => {
  res.json({"body": "you\'ve hit the api @ port 8080"});
});

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('app running on port ' + port);
})