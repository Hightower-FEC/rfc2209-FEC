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

  if (parsedCookies.helpful) {
    req.helpful = parsedCookies.helpful;
  }

  if (parsedCookies.reported) {
    req.reported = parsedCookies.reported;
  }

  if (req.method === 'PUT') {

  }

  next();
};
