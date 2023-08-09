module.exports = (req, res, next) => {
  //console.log(req);

  /**
   * Get cookies as a string
   */
  let cookieString = req.get("Cookie") || "";
  cookieString = unescape(decodeURI(cookieString));
  /**
   * Parse cookies into an object
   */
  parsedCookies = cookieString.split("; ").reduce((cookies, cookie) => {

    if (cookie.length) {
      let index = cookie.indexOf("=");
      let key = cookie.slice(0, index);
      let token = cookie.slice(index + 1);
      console.log(token)
      cookies[key] = decodeURIComponent(token);
    }
    return cookies;
  }, {});

  /**
   * Init req.helpfulReviews
   */
  if (parsedCookies.helpfulReviews) {
    req.helpfulReviews = parsedCookies.helpfulReviews;
  } else {
    req.helpfulReviews = {};
  }

  /**
   * Init req.helpfulQuestions
   */
  if (parsedCookies.helpfulQuestions) {
    req.helpfulQuestions = parsedCookies.helpfulQuestions;
  } else {
    req.helpfulQuestions = {};
  }

  /**
   * Init req.helpfulAnswers
   */
  if (parsedCookies.helpfulAnswers) {
    req.helpfulAnswers = parsedCookies.helpfulAnswers;
  } else {
    req.helpfulAnswers = {};
  }

  /**
   * If req is a PUT, add id to
   */
  if (req.method === 'PUT') {
    var partitions = req.url.split('/');
    var anchor = partitions[1];
    var slug = partitions[partitions.length - 1];
    var id = partitions[partitions.length - 2];

    /**
     * Check if req is sent to helpful or report, then add id to helpfulReviews or reportedReviews in request
     */
    if (anchor === 'reviews' && slug === 'helpful') {
      req.helpfulReviews[id] = true;
    }


    if (anchor === 'qa' && slug === 'helpful') {
      if (partitions[2] === 'questions') {
        req.helpfulQuestions[id] = true;
      } else if (partitions[2] === 'answers') {
        req.helpfulAnswers[id] = true;
      }
    }
    // else if (slug === 'report') {
    //   req.reportedReviews[id] = true;
    // }
  }

  next();
};
