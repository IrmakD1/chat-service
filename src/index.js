const { connectDb } = require('./store');
const logger = require('./logger');
const server = require('./server');
const router = require('./api');

connectDb()
  .then(() => {
    server(router());
  })
  .then(() => {
    throw new Error('Waawwwwwww')
  })
  .catch((err) => {
    logger().error(new Error(`Unable to start service: ${err.message}`));
    process.exit(1);
  });
