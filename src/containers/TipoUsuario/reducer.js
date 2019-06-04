import { fromJS } from 'immutable';

import * as ACTIONS from './constants';

const initialState = fromJS({
	tipoUsuarioData: undefined,
});

export default function(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.SET_TIPOUSUARIO_DATA: {
			return state.set('data', action.datos);
		}
		case ACTIONS.ID_SELECTED_TIPOUSUARIO: {
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
