import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { watchImage } from "../Sagas";
import rootReducer from "../Reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const sagaMiddleWare = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store =  createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleWare)));
sagaMiddleWare.run(watchImage);