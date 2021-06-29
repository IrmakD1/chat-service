const mongoose = require('mongoose');

const userCollectionName =
  process.env.USER_COLLECTION_NAME || 'Users';
const conversationCollectionName =
  process.env.CONVERSATION_COLLECTION_NAME || 'Conversations';

const userSchema = new mongoose.Schema({
  userName: String,
  name: String,
  userId: String,
  contacts: Array
});

const conversationSchema = new mongoose.Schema({
  participants: Array,
  utterances: Array
});

const User = mongoose.model(userCollectionName, userSchema);
const Conversation = mongoose.model(conversationCollectionName, conversationSchema);

module.exports = { User, Conversation };
