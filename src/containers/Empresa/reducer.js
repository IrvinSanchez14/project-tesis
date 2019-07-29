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
		case ACTIONS.AUTORIZACION_FORM_FAIL: {
			return state.set('formularioRespuesta', action.estado);
		}
		case ACTIONS.CREACION_REGISTRO_EMPRESA: {
			return state.set('idSelected', action.erase);
		}
		default:
			return state;
	}
}
