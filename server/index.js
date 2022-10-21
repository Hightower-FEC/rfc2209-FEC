require("dotenv").config();
const express = require("express");
const path = require("path");
const axios = require('axios');
const cookieHandler = require("./middleware/cookieHandler");

const app = express();
app.use(cookieHandler);

const GIT_KEY = process.env.GIT_KEY;
const URL = process.env.URL + process.env.CAMPUS_CODE;

app.use(express.static(path.join(__dirname, "../client/dist")));


app.get('/reviews:page?:count?:sort?:product_id?', (req, res) => {
  if (!req.query.product_id) {
    console.log(req.query);
    res.status(422).send('Must pass a product_id into params');
  } else {
    const product_id = req.query.product_id;
    const page = req.query.page || 0;
    const count = req.query.count || 5;
    const sort = req.query.sort || 'relevant';
    res.send({product_id, page, count, sort});
  }


});

app.listen(3001);
console.log(`Listening at http://localhost:3001`);