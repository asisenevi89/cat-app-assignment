import { saveNewImage } from './app/modules/image.js';
import { processParams } from './app/utils/helpers.js';

const params = processParams(process.argv.slice(2));
const result = await saveNewImage(params);
console.log(result);