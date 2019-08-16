import { put, call, takeEvery } from 'redux-saga/effects';

import api from '../../api';
import { FETCH_LISTADOPRODUCTOS, FETCH_LECTURAPRODUCTO } from './constants';
import * as actions from './actions';

export function* readAllListadoProducto(action) {
	let informacion;
	try {
		informacion = yield call(api.get, '/ProductoPorcion/readAll.php');
	} catch (err) {
		return;
	}
	yield put(actions.setListadoProductosData(informacion.data));
}

export function* fetchListadoProductos() {
	yield takeEvery(FETCH_LISTADOPRODUCTOS, readAllListadoProducto);
}

export function* readAllLecturaProducto(action) {
	let informacion;
	try {
		informacion = yield call(api.get, '/ProductoPorcion/listaProducto.php');
	} catch (err) {
		return;
	}
	yield put(actions.setLecturaProductoData(informacion.data));
}

export function* fetchLecturaProducto() {
	yield takeEvery(FETCH_LECTURAPRODUCTO, readAllLecturaProducto);
}

export default [fetchListadoProductos, fetchLecturaProducto];
