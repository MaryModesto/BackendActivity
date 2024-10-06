const express = require("express");
const app = express();
const port = 3000;
const bodyparser = require("body-parser");
const routes = require("./routes/user.js");
const rateLimiter = require("./middleware/rateLimiter.js");
const logMiddleware = require("./middleware/logMiddleware.js");

app.use(bodyparser.json());

app.use(rateLimiter);
app.use(logMiddleware);
app.use("/", routes);

app.listen(port, () => {
  console.log(`Hello Mary!, App is listening on port ${port}`);
});
