const boom = require('@hapi/boom');
const cors = require('cors');

const logger = require('../../logger');

let whitelist = [];
try {
  whitelist = JSON.parse(process.env.CORS_LIST);
} catch (err) {
  logger.warn('CORS_lIST information missing or incorrect, defaulting to []');
}

const corsFunction = (origin, callback) => {
  if (!origin || whitelist === '*' || whitelist.indexOf(origin) !== -1)
    callback(null, true);
  else callback(boom.unauthorized('Not allowed by CORS'));
};

const corsOptions = {
  origin: corsFunction,
  optionsSuccessStatus: 200,
};

module.exports = () => cors(corsOptions);
