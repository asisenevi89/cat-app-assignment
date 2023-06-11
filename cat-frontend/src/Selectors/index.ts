import { createSelector} from "reselect";
import { get as _get } from "lodash";

interface stateType {
  image: {}
}
const imageState = (state:stateType) => state.image;

export const makeHomeLoadingState = createSelector(
  imageState, data => _get(data, 'isHomeLoading', false),
);

export const makeGalleryData = createSelector(
  imageState, data => _get(data, 'imageGallery', {}),
);