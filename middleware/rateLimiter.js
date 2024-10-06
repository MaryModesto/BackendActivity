const requests = {};

function rateLimiter(req, res, next) {
  const userIP = req.ip;
  const currentTime = Date.now();
  const windowTime = 30 * 1000;
  const requestLimit = 5;

  if (!requests[userIP]) {
    requests[userIP] = { count: 0, startTime: currentTime };
  }

  if (currentTime - requests[userIP].startTime > windowTime) {
    requests[userIP].count = 1;
    requests[userIP].startTime = currentTime;
  } else {
    requests[userIP].count += 1;
    console.log(requests[userIP].count);
    if (requests[userIP].count > requestLimit) {
      return res.status(429).send("Too many requests, please try again later.");
    }
  }

  next();
}

module.exports = rateLimiter;
