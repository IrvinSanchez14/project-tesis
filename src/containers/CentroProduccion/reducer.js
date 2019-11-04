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
			return state.setIn(['detalleProduccion', action.index, 'Cantidad'], action.cantidad);
		}
		case ACTIONS.ACTIVATE_MODAL_PRODUCCION: {
			return state.set('activateModal', action.estado);
		}
		case ACTIONS.ACTIVATE_TOAST_CONFIRM: {
			return state.set('activateToast', action.estado);
		}
		default:
			return state;
	}
}
