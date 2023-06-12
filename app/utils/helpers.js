import { MongoClient } from "mongodb";

export const getMongoConnection = (mongoConfig) => {
  const client = new MongoClient(mongoConfig.mongoHost);

  return client.connect().then(host => {
    return host.db(mongoConfig.mongoDB);
  }).catch(error => {
    throw error;
  });
};

export const getFormattedResponse = (status, message, data = []) => {
  return {
    status,
    message,
    data,
  };
};

export const getErrorResponse = (message = "Error Occurred", statusCode = 500) => {
  return {
    error: true,
    statusCode,
    message,
  };
};