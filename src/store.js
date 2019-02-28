import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { fromJS } from "immutable";
import reducer from "./reducers";

const initialState = {};

const store = createStore(
  reducer,
  fromJS(initialState),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
