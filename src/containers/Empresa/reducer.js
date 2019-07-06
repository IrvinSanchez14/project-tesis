import { fromJS } from 'immutable';

import * as ACTIONS from './constants';

const initialState = fromJS({
	empresaData: undefined,
});

export default function(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.SET_EMPRESA_DATA: {
			return state.set('data', action.datos);
		}
		case ACTIONS.ID_SELECTED_EMPRESA: {
			return state.set('idSelected', action.id);
		}
		case ACTIONS.LOGIN_WATCHER: {
			return state.set('saga', action.payload);
		}
		case ACTIONS.CREACION_REGISTRO: {
			return state.set('idSelected', action.erase);
		}
		default:
			return state;
	}
}
