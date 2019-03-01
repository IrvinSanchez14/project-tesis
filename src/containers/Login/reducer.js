import { fromJS } from "immutable";

import * as ACTIONS from "./constants";

const initialState = fromJS({
  userData: undefined,
  loading: false,
});

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOGIN_STATUS_OK: {
      return state.set("loading", action.loading);
    }
    case ACTIONS.SET_CURRENT_USER: {
      console.log(action);
      return state.set("userData", action.user);
    }
    case ACTIONS.ERROR_LOGIN: {
      return state.set("loading", action.err);
    }
    default:
      return state;
  }
}
