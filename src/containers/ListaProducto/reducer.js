import { fromJS } from 'immutable';

import * as ACTIONS from './constants';

const initialState = fromJS({
	listadoProductosData: undefined,
});

export default function(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.SET_LISTADOPRODUCTOS_DATA: {
			return state.set('data', action.datos);
		}
		case ACTIONS.ID_SELECTED_LISTADOPRODUCTOS: {
			return state.set('idSelected', action.id);
		}
		case ACTIONS.CREACION_REGISTRO_LISTADOPRODUCTOS: {
			return state.set('idSelected', action.erase);
		}
		case ACTIONS.AUTORIZACION_FORM_FAIL: {
			return state.set('formularioRespuesta', action.estado);
		}
		default:
			return state;
	}
}
