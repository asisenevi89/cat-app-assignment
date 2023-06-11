import axios from "axios";
import { put } from "redux-saga/effects";
import { get as _get } from "lodash";
import {
  setHomeLoading,
  setGalleryData,
  setGalleryLoading,
} from "../ActionCreators/ImageActionCreators";

type createSagaType = {
  type: string,
  data: object,
  createUrl: string,
  navigate: any
};

type fetchSagaType = {
  type: string,
  fetchUrl: string,
};
export function* createImageSaga(action: createSagaType) {
  const { data, createUrl, navigate } = action;
  try {
    yield put(setHomeLoading(true));
    const response: object = yield axios.post(createUrl, data);
    const imageId = _get(response, 'data.data.insertedId', '');
    yield put(setHomeLoading(false));
    yield navigate(`/image/${imageId}`);
  } catch (error) {
    console.log(error);
    yield put(setHomeLoading(false));
  }
}

export function* fetchImageDataSaga(action: fetchSagaType) {
  const { fetchUrl } = action;
  try {
    yield put(setGalleryLoading(true));
    const response: object = yield axios.get(fetchUrl);
    const totalCount = _get(response, 'data.data.totalCount', 0);
    const list = _get(response, 'data.data.data', []);
    yield put(setGalleryData({ totalCount, list }));
    yield put(setGalleryLoading(false));
  } catch (error) {
    console.log(error);
    yield put(setGalleryLoading(false));
  }
}