import { fromJS } from 'immutable';

import * as ACTIONS from './constants';

const initialState = fromJS({
	facturaData: undefined,
});

export default function(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.SET_DATA_FACTURA: {
			return state.set('data', action.datos);
		}
		default:
			return state;
	}
}
