import { fromJS } from 'immutable';

import * as ACTIONS from './constants';

const initialState = fromJS({
	proveedorData: undefined,
});

export default function(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.CLICK_FACTURA: {
			return state.set('revisarFactura', action.estado);
		}
		case ACTIONS.CHECK_CABECERA_FACTURA: {
			return state.set('cabeceraFactura', action.informacion).set('banderaCabecera', action.bandera);
		}
		case ACTIONS.BANDERA_CABECERA_REMOVE: {
			return state.set('banderaCabecera', action.flag);
		}
		case ACTIONS.CHECK_DETALLE_FACTURA: {
			return state.set('detalleFactura', action.detalle).set('banderaCabecera', action.flag);
		}
		default:
			return state;
	}
}
