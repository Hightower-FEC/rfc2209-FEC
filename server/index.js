require("dotenv").config();
const express = require("express");
const path = require("path");
const axios = require('axios');
const cookieHandler = require('./middleware/cookieHandler');

const app = express();
app.use(cookieHandler);

const GIT_KEY = process.env.GIT_KEY;
const URL = process.env.URL + process.env.CAMPUS_CODE;

const AUTH = {
  headers: {
    Authorization: GIT_KEY
  }
};


app.use(express.static(path.join(__dirname, '../client/dist')));

/**
 * Endpoint for fetching reviews for a certain product
 */
app.get('/reviews:page?:count?:sort?:product_id?', (req, res) => {
  // Can't do anything without a product_id
  if (!req.query.product_id) {
    console.log('req.query');
    res.status(422).send('Must pass a product_id into params');
  } else {
    // Set parameters to passed or default values
    const product_id = req.query.product_id;
    const page = req.query.page || 1;
    const count = req.query.count || 5000;
    const sort = req.query.sort || 'relevant';

    // Send GET to API using params
    axios.get(`${URL}/reviews?product_id=${product_id}&page=${page}&count=${count}&sort=${sort}`, AUTH)
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;

          // Iterate through each review and if its ID is found in helpfulReviews cookie, then we set a new prop, helpful, as true
          for (let i = 0; i < data.results.length; i++) {
            let helpful = false;
            for (helpfulReviewId in req.helpfulReviews) {
              if (Number(helpfulReviewId) === data.results[i].review_id) {
                helpful = true;
                break;
              }
            }
            data.results[i]['helpful'] = helpful;
          }
          res.send(data);
        } else {
          res.status(500).send(response);
        }
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  }
});

/**
 * Endpoint for marking a review as helpful
 */
app.put('/reviews/:review_id/helpful', (req, res) => {
  axios.put(`${URL}/reviews/${req.params.review_id}/helpful`, null, AUTH)
    .then((response) => {
      console.log(response.status);
      if (response.status === 204) {
        res.cookie('helpfulReviews', JSON.stringify(req.helpfulReviews));
        res.send('Successfully marked review as helpful');
      } else {
        res.status(500).send(response);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

/**
 * Endpoint for reporting a review
 */
app.put('/reviews/:review_id/report', (req, res) => {
  console.log();
  axios.put(`${URL}/reviews/${req.params.review_id}/report`, null, AUTH)
    .then((response) => {
      if (response.status === 204) {
        res.send('Successfully reported review');
      } else {
        res.status(500).send(response);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

/**
 * Endpoint for getting review metadata for a certain product
 */
app.get('/reviews/meta:product_id?', (req, res) => {
  axios.get(`${URL}/reviews/meta?product_id=${req.query.product_id}`, AUTH)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(3001);
console.log('Listening at http://localhost:3001');