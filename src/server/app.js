const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan')

const { errorHandler, serverStatus } = require('./middleware')


module.exports = (apiRouter) => {
  const app = express();

  //Helmet helps you secure your Express apps by setting various HTTP headers
  app.use(helmet());

  app.use(express.json());

  app.use(express.urlencoded());

  //using morgan middleware logger
  app.use(morgan(function (tokens, req, res) {
  if (tokens.url(req, res).includes('service-worker')) return   
  return ['_____________',
    `Method: ${tokens.method(req, res)};`,
    `Url: ${tokens.url(req, res)};`,
    `Status code: ${tokens.status(req, res)};`,
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    '_____________'
  ].join(' ')
}))

  const started = new Date();
  app.use(serverStatus(started));

  //Can add auth middleware validating api key or bearer token
  // app.use(auth());

  // main application router
  app.use('/', apiRouter);

  // error handler - app router should pass errors down to here
  app.use(errorHandler());

  return app;
};
