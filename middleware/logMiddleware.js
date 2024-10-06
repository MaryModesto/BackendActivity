const logMiddleware = (req, res, next) => {
  const currentTime = new Date().toISOString();
  const { method, url } = req;

  console.log(`[${currentTime}] ${method} Request to ${url}`);

  next();
};

module.exports = logMiddleware;
