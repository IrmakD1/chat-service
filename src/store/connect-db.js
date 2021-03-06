const mongoose = require('mongoose');
const logger = require('../logger');

const connectDb = async () => {
  logger.info('Connecting to Mongo Db...');

  const connectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };

  //Optional authentication for DB
  if (process.env.MONGO_USER && process.env.MONGO_PASSWORD)
    connectionOptions.auth = {
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
    };

  try {
    await mongoose.connect(process.env.MONGO_URL, connectionOptions);
    logger.info('Connected to DB');
  } catch (err) {
    throw err;
  }
};

module.exports = connectDb;
