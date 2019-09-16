import { put, call, takeEvery } from 'redux-saga/effects';

import api from '../../api';
import { FETCH_DATA_FACTURA, FETCH_DATA_PRODUCCION, FETCH_DATA_DETALLE_PRODUCCION } from './constants';
import * as actions from './actions';

export function* readAllFactura(action) {
	let inforamcion;
	try {
		inforamcion = yield call(api.get, '/Factura/readAll.php');
	} catch (err) {
		return;
	}
	yield put(actions.setDataFactura(inforamcion.data));
}

export function* fetchFactura() {
	yield takeEvery(FETCH_DATA_FACTURA, readAllFactura);
}

export function* readAllProduccion(action) {
	let inforamcion;
	try {
		inforamcion = yield call(api.get, '/Produccion/readProduccion.php');
	} catch (err) {
		return;
	}
	yield put(actions.setDataProduccion(inforamcion.data));
}

export function* fetchProduccion() {
	yield takeEvery(FETCH_DATA_PRODUCCION, readAllProduccion);
}

export function* readDetalleProduccion(action) {
	let inforamcion;
	try {
		inforamcion = yield call(api.post, '/Produccion/readProduccionDetalle.php', { IdPC: action.id });
	} catch (err) {
		return;
	}
	yield put(actions.setDataDetalleProduccion(inforamcion.data));
}

export function* fetchProduccionDetalle() {
	yield takeEvery(FETCH_DATA_DETALLE_PRODUCCION, readDetalleProduccion);
}

export default [fetchFactura, fetchProduccion, fetchProduccionDetalle];
