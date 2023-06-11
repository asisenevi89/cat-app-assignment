import {SET_GALLERY_DATA, SET_GALLERY_LOADING, SET_HOME_LOADING} from "../ActionCreators/ActionTypes";

type actionObj = {
  type: string,
  payload: any,
};

const initialState = {
  isHomeLoading: false,
  imageGallery: {
    isLoading: false,
    list: [],
    totalCount: 0
  }
};
const imageReducer = (state = initialState, action: actionObj) => {
  const { type, payload } = action;
  switch (type) {
    case SET_HOME_LOADING:
      return {
        ...state,
        isHomeLoading: payload,
      };
    case SET_GALLERY_LOADING:
      return {
        ...state,
        imageGallery: {
          ...state.imageGallery,
          isLoading: payload,
        },
      };
    case SET_GALLERY_DATA:
      return  {
        ...state,
        imageGallery: {
          ...state.imageGallery,
          ...payload,
        },
      };
    default:
      return {
        ...state
      };
  }
}

export default imageReducer;