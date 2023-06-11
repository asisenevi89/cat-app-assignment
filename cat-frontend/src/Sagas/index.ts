import { takeEvery }  from 'redux-saga/effects';
import { createImageSaga, fetchImageDataSaga } from "./ImageSaga";
import { INIT_IMAGE_CREATE, INIT_IMAGES_FETCH } from "../ActionCreators/ActionTypes";

export function* watchImage () {
  yield takeEvery(INIT_IMAGE_CREATE, createImageSaga);
  yield takeEvery(INIT_IMAGES_FETCH, fetchImageDataSaga);
}