import axios from 'axios';
import { ObjectID } from  "bson";
import mergeImg  from 'merge-img';
import fs from "fs";
import config from "../utils/config.js";
import { getErrorResponse, getMongoConnection } from "../utils/helpers.js";

/**
 * Create and Save new image
 *
 * @param reqBody Object
 * @return Object
 */
export const saveNewImage = async reqBody => {
  try {
    const { catURL, defaultImageProps, imageResponseType } = config;
    const {
      width: defaultWidth,
      height: defaultHeight,
      color: defaultColor,
      size: defaultSize,
      greeting: defaultGreeting,
    } = defaultImageProps;

    // If data not available in the request body assign default values
    const width = reqBody.width || defaultWidth;
    const height = reqBody.height || defaultHeight;
    const color = reqBody.color || defaultColor;
    const size = reqBody.size || defaultSize;
    const greeting1 = reqBody.greeting1 || defaultGreeting;
    const greeting2 = reqBody.greeting2 || defaultGreeting;


    const url1 =
      encodeURI(`${catURL}/${greeting1}?width=${width}&amp;height=${height}&amp;color=${color}&amp;s=${size}`);
    const url2 =
      encodeURI(`${catURL}/${greeting2}?width=${width}&amp;height=${height}&amp;color=${color}&amp;s=${size}`);

    // Temporary location for save images from the cat API
    const filePath1 = `${process.cwd()}/storage/temp/image1.jpeg`;
    const filePath2 = `${process.cwd()}/storage/temp/image2.jpeg`;

    // Requests for cat API to get images
    await Promise.all([
      imageRequest(url1, imageResponseType, filePath1),
      imageRequest(url2, imageResponseType, filePath2),
    ]);

    // Create new image with saved data and save it
    const imageData = await imageSave(filePath1, filePath2);

    // store saved image data in the mongo db for future reference.
    return saveImageDataToDB(imageData);

  } catch (error) {
    console.log(error);
    return getErrorResponse(error.message);
  }
};
/**
 * Get image data
 *
 * @param imageId String
 * @return Object
 */
export const getImage = async imageId => {
  try {
    const { mongo } = config;
    const connection = await getMongoConnection(mongo);
    const collection = connection.collection(mongo.catCollection);

    // To get specific image or random image
    let imageData;
    if (imageId === 'random') {
      const randomRecord = await collection.aggregate([
        {
          "$sample": {
            "size": 1
          }
        }
      ]).toArray();
      imageData = randomRecord && randomRecord[0];
    } else {
      imageData = await collection.findOne({ _id: ObjectID(imageId) });
    }

    if (!imageData) {
      return getErrorResponse('Image Not Found', 404);
    }
    return imageData;
  } catch (error) {
    console.log(error);
    return getErrorResponse(error.message);
  }
};
/**
 * List images
 *
 * @param count Integer
 * @param skip Integer
 * @return {Promise<{data: *, totalCount: *}|{error: boolean, message: string, statusCode: number}>}
 */
export const listImages = async (count, skip) => {
  try {
    const skipValue = skip ? parseInt(skip) : 10;
    const countValue = count ? parseInt(count) : 0
    const { mongo } = config;
    const connection = await getMongoConnection(mongo);
    const collection = connection.collection(mongo.catCollection);

    const totalCount = await collection.find({}).count();
    const data = await collection.find({}).skip(skipValue).limit(countValue).toArray();
    return {
      totalCount,
      data,
    };
  } catch (error) {
    console.log(error);
    return getErrorResponse(error.message);
  }
}

/**
 * Fetch an image from cat API and saves it temp location
 *
 * @param url String
 * @param encoding String
 * @param filePath String
 * @return {Promise}
 */
const imageRequest = async (url, encoding, filePath) => {
  try {
    const response = await axios.get(url, { responseType: encoding });
    await new Promise((resolve, reject) => {
      response.data
        .pipe(fs.createWriteStream(filePath))
        .on('finish', () => resolve())
        .on('error', error => reject(error));
    });
  } catch (error) {
    console.log(error);
    throw new Error('Image request failed.');
  }
};

/**
 * Merge two images in temp location and create and save a new image
 *
 * @param imagePath1 String
 * @param imagePath2 String
 * @return Object
 */
const imageSave = async (imagePath1, imagePath2) => {
  try {
    const { storageDir } = config;
    const imageName = `cat_image_${Date.now()}.jpeg`;
    const filePath = `${process.cwd()}/${storageDir}/${imageName}`;
    const newImage = await mergeImg([imagePath1, imagePath2], { align: 'center'});
    await newImage.write(filePath);
    return { imageName, filePath };
  } catch (error) {
    console.log(error);
    throw new error('Saving image failed');
  }
};

/**
 * Saved created image data in the Mongo Collection
 *
 * @param data Object
 * @return Object
 */
const saveImageDataToDB = async data => {
  try {
    const { mongo } = config;
    const connection = await getMongoConnection(mongo);
    const collection = connection.collection(mongo.catCollection);
    return collection.insertOne({
      ...data,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

