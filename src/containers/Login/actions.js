import jwt_decode from "jwt-decode";
import * as ACTIONS from "./constants";
import setAuthToken from "../../api/authorization";
import api from "../../api";

export function setUserNameLogin(userName) {
  return {
    type: ACTIONS.SET_USERNAME_LOGIN,
    userName,
  };
}

export const loginuser = user => dispatch => {
  api
    .post("/login.php", user)
    .then(res => {
      const { jwt } = res.data;
      localStorage.setItem("token", jwt);
      setAuthToken(jwt);
      const decoded = jwt_decode(jwt);
      dispatch(loginOk(true));
      dispatch(setCurrentUser(decoded.data));
      dispatch(loginOk(false));
      dispatch(isAuthenticated(true));
    })
    .catch(err => {
      dispatch(loginOk(true));
      dispatch(errorLogin(false));
    });
};

export const setCurrentUser = decoded => {
  return {
    type: ACTIONS.SET_CURRENT_USER,
    user: decoded,
  };
};

export const loginOk = loading => {
  return {
    type: ACTIONS.LOGIN_STATUS_OK,
    loading: loading,
  };
};

export const errorLogin = err => {
  return {
    type: ACTIONS.ERROR_LOGIN,
    err: err,
  };
};

export const isAuthenticated = auth => {
  return {
    type: ACTIONS.IS_AUTHENTICATED,
    auth: auth,
  };
};

export const logoutUser = history => dispatch => {
  localStorage.removeItem("token");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch(errorLogin(false));
};
