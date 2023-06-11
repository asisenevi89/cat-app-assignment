const imageModule = require('../modules/image');
const { getFormattedResponse } = require('../utils/helpers');
const config = require('../utils/config');

module.exports = app => {
  app.get('/', (req, res) => {
    res.json(getFormattedResponse(true, "Home Route"));
  });

  /**
   * Endpoint to save a new image
   * @return object
   *
   * sample request body
   * {
   *     "width": 500,
   *     "height": 400,
   *     "size": 150,
   *     "greeting1": "Hi There",
   *     "greeting2": "Hello There"
   * }
   *
   * sample response body
   * {
   *     "status": true,
   *     "message": "New Image Created",
   *     "data": {
   *         "acknowledged": true,
   *         "insertedId": "64854a6bf98f3b8bffd4e42a"
   *     }
   * }
   *
   */
  app.post('/save-new-image', async (req, res) => {
    const result = await imageModule.saveNewImage(req.body);

    if (result.error) {
      res.status(result.statusCode).json(getFormattedResponse(false, result.message));
      return;
    }
    res.json(getFormattedResponse(true, "New Image Created", result));
  });

  /**
   * Endpoint to serve saved image file
   *
   * url param id (string)
   *
   */
  app.get('/get-image/:id', async(req, res) => {
    const { storageDir } = config;
    const result = await imageModule.getImage(req.params.id);
    if (result.error) {
      res.status(result.statusCode).json(getFormattedResponse(false, result.message));
      return;
    }
    const filepath = `${process.cwd()}/${storageDir}/${result.imageName}`;
    res.sendFile(filepath);
  });

  /**
   * Endpoint to list paginated images
   *
   * query param count (integer)
   * query param skip (integer)
   *
   * sample response
   * {
   *     "status": true,
   *     "message": "Image List",
   *     "data": {
   *         "totalCount": 21,
   *         "data": [
   *             {
   *                 "_id": "64837528e1f532987c469a72",
   *                 "imageName": "cat_image_1686336808553.jpeg",
   *                 "filePath": "/home/user/Public/cat-app/cat-node/storage/cat_image_1686336808553.jpeg"
   *             }
   *         ]
   *     }
   * }
   */
  app.get('/list-images', async(req, res) => {
    const { count, skip } = req.query
    const result = await imageModule.listImages(count, skip);

    if (result.error) {
      res.status(result.statusCode).json(getFormattedResponse(false, result.message));
      return;
    }
    res.json(getFormattedResponse(true, "Image List", result));
  });
};