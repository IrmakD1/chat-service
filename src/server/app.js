const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const { errorHandler, serverStatus, loggerFormat, cors, } = require("./middleware");

module.exports = (apiRouter) => {
  const app = express();

  //Helmet helps you secure your Express apps by setting various HTTP headers
  app.use(helmet());

  app.use(express.json());

  app.use(express.urlencoded());

  app.use(morgan((tokens, req, res) => loggerFormat(tokens, req, res)))

  const started = new Date();
  app.use(serverStatus(started));

  //Can add auth middleware validating api key or bearer token
  // app.use(auth());

  // checks cors requests against a whitelist
  app.use(cors());

  // main application router
  app.use("/", apiRouter);

  // error handler - app router should pass errors down to here
  app.use(errorHandler());

  return app;
};
