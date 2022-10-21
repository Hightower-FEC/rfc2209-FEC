module.exports = (req, res, next) => {
  console.log(req);

  let cookieString = req.get("Cookie") || "";

  parsedCookies = cookieString.split("; ").reduce((cookies, cookie) => {
    if (cookie.length) {
      let index = cookie.indexOf("=");
      let key = cookie.slice(0, index);
      let token = cookie.slice(index + 1);
      cookies[key] = token;
    }
    return cookies;
  }, {});

  if (parsedCookies.helpfulReviews) {
    req.helpfulReviews = parsedCookies.helpfulReviews;
  } else {
    req.helpfulReviews = {};
  }

  if (parsedCookies.reportedReviews) {
    req.reportedReviews = parsedCookies.reported;
  } else {
    req.reportedReviews = {};
  }

  if (req.method === 'PUT') {
    var partitions = req.url.split('/');
    var slug = partitions[partitions.length - 1];

    if (slug === 'helpful') {
      req.
    } else if (slug === 'report') {

    }
  }

  next();
};
