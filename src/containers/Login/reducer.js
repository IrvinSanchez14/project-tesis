import { fromJS } from 'immutable';

import * as ACTIONS from './constants';

const initialState = fromJS({
	userData: undefined,
	loading: false,
	isAuthenticated: false,
});

export default function(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.LOGIN_STATUS_OK: {
			return state.set('loading', action.loading);
		}
		case ACTIONS.SET_CURRENT_USER: {
			return state.set('userData', action.user);
		}
		case ACTIONS.ERROR_LOGIN: {
			return state.set('loading', action.err);
		}
		case ACTIONS.IS_AUTHENTICATED: {
			return state.set('isAuthenticated', action.auth);
		}
		default:
			return state;
	}
}
