import { fromJS } from 'immutable';

import * as ACTIONS from './constants';

const initialState = fromJS({
	unidadMedidaData: undefined,
});

export default function(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.SET_UNIDADMEDIDA_DATA: {
			return state.set('data', action.datos);
		}
		case ACTIONS.ID_SELECTED_UNIDADMEDIDA: {
			return state.set('idSelected', action.id);
		}
		case ACTIONS.CREACION_REGISTRO_UNIDADMEDIDA: {
			return state.set('idSelected', action.erase);
		}
		default:
			return state;
	}
}
