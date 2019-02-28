import * as ACTIONS from "./constants";

export function setUserNameLogin(userName) {
  return {
    type: ACTIONS.SET_USERNAME_LOGIN,
    userName,
  };
}
