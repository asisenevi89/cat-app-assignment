import axios from 'axios';
import mergeImg  from 'merge-img';
import fs from "fs";
import config from "../utils/config.js";
import { getErrorResponse, getFormattedResponse } from "../utils/helpers.js";

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

    return  getFormattedResponse(true, "New Image Created", imageData);
  } catch (error) {
    console.log(error);
    return getErrorResponse(error.message);
  }
};

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

