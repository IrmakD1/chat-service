const Boom = require("@hapi/boom");
const _ = require("lodash");
const { User, Conversation } = require("./mongo");

const fetchChatData = async (model, id) => {
  let query
  
  if (model === User) query = { userId: id}
  if (model === Conversation) query = { convId: id }

  const results = await model.find(query);
  const docs = _.map(results, (d) => {
    const doc = d._doc;
    delete doc.__v;
    return doc;
  });

  if (docs.length === 0) throw Boom.notFound();
  if (docs.length > 1)
    throw Boom.badImplementation(`Duplicate users found for id ${id}`);
  return docs[0];
};

module.exports = fetchChatData;
