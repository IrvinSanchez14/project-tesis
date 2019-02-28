import { combineReducers } from "redux-immutable";
import login from "./containers/Login/reducer";

const appReducer = combineReducers({
  login,
});

export default appReducer;
