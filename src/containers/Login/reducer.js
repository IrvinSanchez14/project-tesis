import { fromJS } from "immutable";

import * as ACTIONS from "./constants";

const initialState = fromJS({
  adminExperience: undefined,
});

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_USERNAME_LOGIN: {
      return state.set("adminExperience", fromJS(action.userName));
    }
    default:
      return state;
  }
}
