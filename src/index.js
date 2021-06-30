const logger = require('./logger');
const { connectDb } = require('./store');
const server = require('./server');
const router = require('./api');

logger.info('....Starting service....')

connectDb()
  .then(() => {
    server(router());
  })
  .catch((err) => {
    logger.error(`Unable to start service: ${err}`);
    process.exit(1);
  });
