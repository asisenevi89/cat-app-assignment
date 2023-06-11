import {
  INIT_IMAGE_CREATE,
  INIT_IMAGES_FETCH,
  SET_HOME_LOADING,
  SET_GALLERY_LOADING,
  SET_GALLERY_DATA,
} from "./ActionTypes";

import { DEFAULT_IMAGE_FETCH_COUNT as count } from "../Utils/Constants";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const createImage = (data: object, navigate: any) => {
  const createUrl = `${backendUrl}/save-new-image`

  return {
    type: INIT_IMAGE_CREATE,
    createUrl,
    data,
    navigate,
  };
};

export const fetchImageData = (skip: number) => {
  const fetchUrl = `${backendUrl}/list-images?count=${count}&skip=${skip}`

  return {
    type: INIT_IMAGES_FETCH,
    fetchUrl,
  };
}

export const setHomeLoading = (payload: boolean) => {
  return {
    type: SET_HOME_LOADING,
    payload,
  };
};

export const setGalleryLoading = (payload: boolean) => {
  return {
    type: SET_GALLERY_LOADING,
    payload,
  };
};

export const setGalleryData = (payload: object) => {
  return {
    type: SET_GALLERY_DATA,
    payload,
  };
}