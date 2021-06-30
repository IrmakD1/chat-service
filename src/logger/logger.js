const { createLogger, transports, format } = require("winston");
const _ = require('lodash')
const fs = require('fs');
const path = require('path');

const json = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
);

const { version, name } = json;

const getErrorInfo = (info) => {
  if(info.stack) {
    if(info.isBoom) {
      const statusCode = _.get(info, 'output.payload.statusCode', '')
      const error = _.get(info, 'output.payload.error', '')
      return `Error: ${error} ---- status code: ${statusCode} ---- ${info.stack}`
    }

    if(info.isServer) {
      return "Generic Server Error"
    }

    return `${info.stack}`
  }
  return ''
}

const formatMessage = (info) => {
  return `${info.level}: ${info.message}; ${getErrorInfo(info)} ${info.timestamp}`
}

const myformat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.errors({ stack: true }),
  format.printf(info => `${info.service} ---- ${formatMessage(info)}`),
);

const logger = createLogger({
    defaultMeta: { service: `${name}:${version}`},
    transports: [
        new transports.Console({
            format: myformat
        })
    ]
});

module.exports = logger