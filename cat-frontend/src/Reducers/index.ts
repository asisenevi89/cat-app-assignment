import { combineReducers} from "redux";
import image from "./ImageReducer";

const rootReducer = combineReducers({
  image,
});

export default rootReducer;