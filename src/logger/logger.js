// const { createLogger, format, transports } = require('winston');

// const logger = createLogger({
//   level: 'info',
//   format: format.combine(
//     format.timestamp({
//       format: 'YYYY-MM-DD HH:mm:ss',
//     }),
//     format.errors({ stack: true }),
//     format.splat(),
//     format.json()
//   ),
//   defaultMeta: { service: 'THE-data-service' },
//   transports: [
//     new transports.Console({
//       format: format.combine(format.colorize(), format.simple()),
//     }),
//   ],
// });

// module.exports = logger;


const { createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, printf } = format;

const myFormat = printf( ({ level, message, timestamp , ...metadata}) => {
  let msg = `${timestamp} [${level}] : ${message} `  
  console.log('///////////metadata: ', metadata);
  return msg
});

const logger = createLogger({
  level: 'debug',
  format: combine(
	format.colorize(),
	splat(),
	timestamp(),
	myFormat
  ),
  transports: [
	new transports.Console({ level: 'info' }),
  ]
});
module.exports = logger