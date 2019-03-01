import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from "redux-thunk";
import { fromJS } from "immutable";
import reducer from "./reducers";

const initialState = {};

const store = createStore(
  reducer,
  fromJS(initialState),
  composeWithDevTools(
    applyMiddleware(thunk),
    )
);

export default store;
