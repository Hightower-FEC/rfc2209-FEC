require("dotenv").config();
const express = require("express");
const path = require("path");
const axios = require('axios');
const cookieHandler = require('./middleware/cookieHandler');

const app = express();
app.use(cookieHandler);
app.use(express.json());

const GIT_KEY = process.env.GIT_KEY;
const URL = process.env.URL + process.env.CAMPUS_CODE;

const AUTH = {
  headers: {
    Authorization: GIT_KEY
  }
};

//Add content-type to post requests' headers
const POSTHEADERS = {
  headers: Object.assign({}, AUTH.headers, {'Content-Type': 'application/json'})
};

app.use(express.static(path.join(__dirname, '../client/dist')));

/**
 * Endpoint for fetching products
 */
app.get('/products:page?:count?', (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.page || 5;

  axios.get(`${URL}/products?page=${page}&count=${count}`, AUTH)
    .then((response) => {
      if (response.status === 200) {
        res.send(response.data);
      } else {
        res.status(500).send(response);
      }
    })
    .catch((error) => {
      res.send(error);
    });

});

/**
 * Endpoint for fetching product by id
 */
app.get('/products/:product_id', (req, res) => {
  const product_id = req.params.product_id;

  axios.get(`${URL}/products/${product_id}`, AUTH)
    .then((response) => {
      if (response.status === 200) {
        res.send(response.data);
      } else {
        res.status(500).send(response);
      }
    })
    .catch((error) => {
      res.send(error);
    });

});

/**
 * Endpoint for fetching product style by product id
 */
app.get('/products/:product_id/styles', (req, res) => {
  const product_id = req.params.product_id;

  axios.get(`${URL}/products/${product_id}/styles`, AUTH)
    .then((response) => {
      if (response.status === 200) {
        res.send(response.data);
      } else {
        res.status(500).send(response);
      }
    })
    .catch((error) => {
      res.send(error);
    });

});

/**
 * Endpoint for fetching related products by product id
 */
app.get('/products/:product_id/related', (req, res) => {
  const product_id = req.params.product_id;

  axios.get(`${URL}/products/${product_id}/related`, AUTH)
    .then((response) => {
      if (response.status === 200) {
        res.send(response.data);
      } else {
        res.status(500).send(response);
      }
    })
    .catch((error) => {
      res.send(error);
    });

});

/**
 * Endpoint for fetching reviews for a certain product
 */
app.get('/reviews:page?:count?:sort?:product_id?', (req, res) => {
  // Can't do anything without a product_id
  if (!req.query.product_id) {
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
        res.send(error);
      });
  }
});

/**
 * Endpoint for getting review metadata for a certain product
 */
app.get('/reviews/meta:product_id?', (req, res) => {
  if (!req.query.product_id) {
    res.status(422).send('Must pass a product_id into params');
  } else {
    axios.get(`${URL}/reviews/meta?product_id=${req.query.product_id}`, AUTH)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
});

/**
 * Endpoint for getting list of questions for a particular product.  Does not include any reported questions
 */
app.get('/qa/questions:product_id?:page?:count?', (req, res) => {
  // Can't do anything without a product_id
  if (!req.query.product_id) {
    res.status(422).send('Must pass a product_id into params');
  } else {
    // Set parameters to passed or default values
    const product_id = req.query.product_id;
    const page = req.query.page || 1;
    const count = req.query.count || 5000;

    // Send GET to API using params
    axios.get(`${URL}/qa/questions?product_id=${product_id}&page=${page}&count=${count}`, AUTH)
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;

          // Iterate through each question and if its ID is found in helpfulQuestions cookie, then we set a new prop, helpful, as true
          for (let i = 0; i < data.results.length; i++) {
            let helpful = false;
            for (helpfulQuestionId in req.helpfulQuestions) {
              if (Number(helpfulQuestionId) === data.results[i].question_id) {
                helpful = true;
                break;
              }
            }
            data.results[i]['helpful'] = helpful;

            //Repeat process for answers
            for (answerId in data.results[i].answers) {
              helpful = false;
              for (helpfulAnswerId in req.helpfulAnswers) {
                if (helpfulAnswerId === answerId) {
                  helpful = true;
                }
              }
              data.results[i].answers[answerId]['helpful'] = helpful;
            }

          }
          res.send(data);
        } else {
          res.status(500).send(response);
        }
      })
      .catch((error) => {
        res.send(error);
      });
  }
});

/**
 * Returns answers for a given question.  This does not include any reported answers.
 */
app.get('/qa/questions/:question_id/answers', (req, res) => {
  axios.get(`${URL}/qa/questions/${req.params.question_id}/answers`, AUTH)
    .then((response) => {
      if (response.status === 200) {
        let data = response.data;
        // Iterate through each answer and if its ID is found in helpfulAnswers cookie, then we set a new prop, helpful, as true
        for (let i = 0; i < data.results.length; i++) {
          let helpful = false;
          for (helpfulAnswerId in req.helpfulAnswers) {
            if (Number(helpfulAnswerId) === data.results[i].answer_id) {
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
    });
});

/**
 * Endpoint for marking a review as helpful
 */
app.put('/reviews/:review_id/helpful', (req, res) => {
  axios.put(`${URL}/reviews/${req.params.review_id}/helpful`, null, AUTH)
    .then((response) => {
      if (response.status === 204) {
        res.cookie('helpfulReviews', JSON.stringify(req.helpfulReviews));
        res.send('Successfully marked review as helpful');
      } else {
        res.status(500).send(response);
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

/**
 * Endpoint for reporting a review
 */
app.put('/reviews/:review_id/report', (req, res) => {
  axios.put(`${URL}/reviews/${req.params.review_id}/report`, null, AUTH)
    .then((response) => {
      if (response.status === 204) {
        res.send('Successfully reported review');
      } else {
        res.status(500).send(response);
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

/**
 * Endpoint for marking a question as helpful
 */
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  axios.put(`${URL}/qa/questions/${req.params.question_id}/helpful`, null, AUTH)
    .then((response) => {
      if (response.status === 204) {
        res.cookie('helpfulQuestions', JSON.stringify(req.helpfulQuestions));
        res.send('Successfully marked question as helpful');
      } else {
        res.status(500).send(response);
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

/**
 * Endpoint for reporting a question
 */
app.put('/qa/questions/:question_id/report', (req, res) => {
  axios.put(`${URL}/qa/questions/${req.params.review_id}/report`, null, AUTH)
    .then((response) => {
      if (response.status === 204) {
        res.send('Successfully reported question');
      } else {
        res.status(500).send(response);
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

/**
 * Endpoint for marking an answer as helpful
 */
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  axios.put(`${URL}/qa/answers/${req.params.answer_id}/helpful`, null, AUTH)
    .then((response) => {
      if (response.status === 204) {
        res.cookie('helpfulAnswers', JSON.stringify(req.helpfulAnswers));
        res.send('Successfully marked answer as helpful');
      } else {
        res.status(500).send(response);
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

/**
 * Endpoint for reporting a question
 */
app.put('/qa/answers/:answer_id/report', (req, res) => {
  axios.put(`${URL}/qa/answers/${req.params.answer_id}/report`, null, AUTH)
    .then((response) => {
      if (response.status === 204) {
        res.send('Successfully reported answer');
      } else {
        res.status(500).send(response);
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post('/reviews', (req, res) => {
  axios.post(`${URL}/reviews`, req.body, POSTHEADERS)
    .then((response) => {
      if (response.status === 201) {
        res.send('Successfully posted review');
      } else {
        res.status(500).send(response);
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});


app.post('/qa/questions', (req, res) => {
  axios.post(`${URL}/qa/questions`, req.body, POSTHEADERS)
    .then((response) => {
      if (response.status === 201) {
        res.send('Successfully posted question');
      } else {
        res.status(500).send(response);
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  axios.post(`${URL}/qa/questions/${req.params.question_id}/answers`, req.body, POSTHEADERS)
    .then((response) => {
      if (response.status === 201) {
        res.send('Successfully posted answer');
      } else {
        res.status(500).send(response);
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(3001);
console.log('Listening at http://localhost:3001');