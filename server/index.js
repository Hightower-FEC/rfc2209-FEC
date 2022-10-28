
require("dotenv").config();
const GIT_KEY = process.env.GIT_KEY;
const API_URL = process.env.API_URL + process.env.CAMPUS_CODE;
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;
const fs = require('fs');
const express = require("express");
const multer = require('multer');
const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

const path = require("path");
const axios = require('axios');
const cookieHandler = require('./middleware/cookieHandler');
const compression = require('compression');
const app = express();
app.use(cookieHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses if this request header is present
    return false;
  }

  // fallback to standard compression
  return compression.filter(req, res);
};

app.use(compression({
  // filter decides if the response should be compressed or not,
  // based on the `shouldCompress` function above
  filter: shouldCompress,
  // threshold is the byte threshold for the response body size
  // before compression is considered, the default is 1kb
  threshold: 0
}));


const AUTH = {
  headers: {
    Authorization: GIT_KEY
  }
};

//Add content-type to post requests' headers
const POSTHEADERS = {
  headers: Object.assign({}, AUTH.headers, {'Content-Type': 'application/json'})
};

app.use('/uploads', express.static('uploads'));
app.use('/assets', express.static('assets'));
app.use(express.static(path.join(__dirname, '../client/dist')));


/**
 * Endpoint for fetching products
 */
app.get('/products:page?:count?', (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  axios.get(`${API_URL}/products?page=${page}&count=${count}`, AUTH)
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
  console.log(GIT_KEY);

  axios.get(`${API_URL}/products/${product_id}`, AUTH)
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

  axios.get(`${API_URL}/products/${product_id}/styles`, AUTH)
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

  axios.get(`${API_URL}/products/${product_id}/related`, AUTH)
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
    axios.get(`${API_URL}/reviews?product_id=${product_id}&page=${page}&count=${count}&sort=${sort}`, AUTH)
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
    axios.get(`${API_URL}/reviews/meta?product_id=${req.query.product_id}`, AUTH)
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
    axios.get(`${API_URL}/qa/questions?product_id=${product_id}&page=${page}&count=${count}`, AUTH)
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
  axios.get(`${API_URL}/qa/questions/${req.params.question_id}/answers`, AUTH)
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
  axios.put(`${API_URL}/reviews/${req.params.review_id}/helpful`, null, AUTH)
    .then((response) => {
      if (response.status === 204) {
        res.cookie('helpfulReviews', JSON.stringify(req.helpfulReviews));
        res.status(204).send('Successfully marked review as helpful');
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
  axios.put(`${API_URL}/reviews/${req.params.review_id}/report`, null, AUTH)
    .then((response) => {
      if (response.status === 204) {
        res.status(204).send('Successfully reported review');
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
  axios.put(`${API_URL}/qa/questions/${req.params.question_id}/helpful`, null, AUTH)
    .then((response) => {
      if (response.status === 204) {
        res.cookie('helpfulQuestions', JSON.stringify(req.helpfulQuestions));
        res.status(204).send('Successfully marked question as helpful');
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
  axios.put(`${API_URL}/qa/questions/${req.params.review_id}/report`, null, AUTH)
    .then((response) => {
      if (response.status === 204) {
        res.status(204).send('Successfully reported question');
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
  axios.put(`${API_URL}/qa/answers/${req.params.answer_id}/helpful`, null, AUTH)
    .then((response) => {
      if (response.status === 204) {
        res.cookie('helpfulAnswers', JSON.stringify(req.helpfulAnswers));
        res.status(204).send('Successfully marked answer as helpful');
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
  axios.put(`${API_URL}/qa/answers/${req.params.answer_id}/report`, null, AUTH)
    .then((response) => {
      if (response.status === 204) {
        res.status(204).send('Successfully reported answer');
      } else {
        res.status(500).send(response);
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

/**
 * Endpoint for posting a review
 */
app.post('/reviews', upload.array('files'), (req, res) => {
  const images = req.files;
  let data = {};

  Object.keys(req.body).map(key => {
    let val = req.body[key];
    if (key === 'product_id' || key === 'rating') {
      val = Number(val);
    } else if (key === 'recommend') {
      val = val === 'true';
    } else if (key === 'characteristics') {
      val = JSON.parse(val);
    }
    data[key] = val;
  });

  let photos = [];
  for (let i = 0; i < images.length; i++) {
    photos.push(`${BASE_URL}:${PORT}/${images[i].path}`);
  }

  data.photos = photos;

  console.log(data);
  axios.post(`${API_URL}/reviews`, data, POSTHEADERS)
    .then((response) => {
      if (response.status === 201) {
        res.status(201).send('Successfully posted review');
      } else {
        res.status(500).send(response);
      }
    })
    .catch((error) => {
      res.status(500).send(error);
      //console.log(error);
    });

});

/**
 * Endpoint for posting a question
 */
app.post('/qa/questions', (req, res) => {
  axios.post(`${API_URL}/qa/questions`, req.body, POSTHEADERS)
    .then((response) => {
      if (response.status === 201) {
        res.status(201).send('Successfully posted question');
      } else {
        res.status(500).send(response);
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

/**
 * Endpoint for posting an answer
 */
app.post('/qa/questions/:question_id/answers', upload.array('files'), (req, res) => {
  const images = req.files;
  let data = {};

  Object.keys(req.body).map(key => {
    let val = req.body[key];
    data[key] = val;
  });

  let photos = [];
  for (let i = 0; i < images.length; i++) {
    photos.push(`${BASE_URL}:${PORT}/${images[i].path}`);
  }

  data.question_id = req.params.question_id;
  data.photos = photos;

  console.log(data);

  axios.post(`${API_URL}/qa/questions/${req.params.question_id}/answers`, data, POSTHEADERS)
    .then((response) => {
      if (response.status === 201) {
        res.status(201).send('Successfully posted answer');
      } else {
        //console.log(response);
        res.status(500).send(response);
      }
    })
    .catch((error) => {
      //console.log(error);
      res.status(500).send(error);
    });
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.set('Content-Type', 'image/gif');
  res.redirect('/assets/not-found.gif');
});

app.listen(PORT);
console.log(`Listening at ${BASE_URL}:${PORT}`);