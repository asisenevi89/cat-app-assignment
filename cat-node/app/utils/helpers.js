const {MongoClient} = require("mongodb");

module.exports.getMongoConnection = (mongoConfig) => {
  const client = new MongoClient(mongoConfig.mongoHost);

  return client.connect().then(host => {
    return host.db(mongoConfig.mongoDB);
  }).catch(error => {
    throw error;
  });
};

module.exports.getFormattedResponse = (status, message, data = []) => {
  return {
    status,
    message,
    data,
  };
};

module.exports.getErrorResponse = (message = "Error Occurred", statusCode = 500) => {
  return {
    error: true,
    statusCode,
    message,
  };
};