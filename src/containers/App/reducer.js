import { fromJS } from 'immutable';

import * as ACTIONS from './constants';

const initialState = fromJS({
	SideBar: {
		isVisible: false,
	},
});

export default function(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.SIDEBAR_STATE: {
			return state.setIn(['SideBar', 'isVisible'], true);
		}
		case ACTIONS.SIDEBAR_STATE_FALSE: {
			return state.setIn(['SideBar', 'isVisible'], false);
		}
		default:
			return state;
	}
}
