import { fromJS } from 'immutable';

import * as ACTIONS from './constants';

const initialState = fromJS({
	permidoSata: undefined,
});

export default function(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.SET_PERMISO_DATA: {
			return state.set('data', action.datos);
		}
		case ACTIONS.ID_SELECTED_PERMISO: {
			return state.set('idSelected', parseInt(action.id));
		}
		case ACTIONS.CREACION_REGISTRO_PERMISO: {
			return state.set('idSelected', action.erase);
		}
		case ACTIONS.AUTORIZACION_FORM_FAIL: {
			return state.set('formularioRespuesta', action.estado);
		}
		default:
			return state;
	}
}
