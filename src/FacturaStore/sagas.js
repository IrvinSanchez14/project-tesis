import { put, takeEvery } from 'redux-saga/effects';

import { ACTUALIZACION_LISTA_FACTURA_DETALLE } from './constants';
import * as actions from './actions';

export function* readAllProducto(action) {
	let productoAll;
	try {
		productoAll = JSON.parse(localStorage.getItem('detalleFactura'))
			? JSON.parse(localStorage.getItem('detalleFactura'))
			: [];
	} catch (err) {
		return;
	}
	yield put(actions.checkDetalleFactura(productoAll, true));
}

export function* actualizacionListaFacturaDetalle() {
	yield takeEvery(ACTUALIZACION_LISTA_FACTURA_DETALLE, readAllProducto);
}

export default actualizacionListaFacturaDetalle;
