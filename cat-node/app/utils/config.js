const mongo = {
  mongoHost: process.env.MONGO_HOST,
  mongoDB: process.env.MONGO_DB,
  catCollection: 'catCollection',
};

const catAPI = process.env.CAT_API || 'https://cataas.com';
const catURL = `${catAPI}/cat/says`;
const imageResponseType = 'stream';
const defaultImageProps = {
  width: 400,
  height: 500,
  color: 'Pink',
  size: 100,
  greeting: 'Hello There !',
};
const storageDir = 'storage';

module.exports = {
  mongo,
  catURL,
  imageResponseType,
  defaultImageProps,
  storageDir,
};

