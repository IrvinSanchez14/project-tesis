import * as ACTIONS from './constants';

export const sidebarState = () => {
	return {
		type: ACTIONS.SIDEBAR_STATE,
		active: true,
	};
};

export const sidebarStateFalse = () => {
	return {
		type: ACTIONS.SIDEBAR_STATE_FALSE,
		active: true,
	};
};
