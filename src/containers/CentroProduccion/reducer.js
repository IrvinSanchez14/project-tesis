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
		case ACTIONS.SET_DATA_PRODUCCION: {
			return state.set('dataProduccion', action.datos);
		}
		case ACTIONS.SET_DATA_DETALLE_PRODUCCION: {
			return state.set('detalleProduccion', action.datos);
		}
		case ACTIONS.UPDATE_DETALLE_CANTIDAD: {
			console.log('action', action);
			return state.setIn(['detalleProduccion', action.index, 'Cantidad'], action.cantidad);
		}
		default:
			return state;
	}
}
