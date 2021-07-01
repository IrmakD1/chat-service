const connectDb = require('./connect-db');
const { User, Conversation } = require('./mongo');

module.exports = { connectDb, User, Conversation };
