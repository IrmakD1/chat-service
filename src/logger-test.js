const Boom = require('@hapi/boom');
const logger = require('./logger');

// logger.info('Information message');
// logger.warn('Warning message');
// logger.error('Error message');


try {
    throw Boom.badData('Blahhhhhh');
} catch (err) {
    logger.error('There was an error:', err);
    throw err
}

// try {
//     throw new Error('Boooooooo')
// } catch (err) {
//     logger.error('There was an error:', err);
//     throw err
// }