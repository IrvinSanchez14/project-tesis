import { put, takeEvery } from 'redux-saga/effects';

import { ACTUALIZACION_LISTA } from './constants';
import * as actions from './actions';

export function* readAllProducto(action) {
	let productoAll;
	try {
		productoAll = JSON.parse(localStorage.getItem('listaExistente'))
			? JSON.parse(localStorage.getItem('listaExistente'))
			: [];
	} catch (err) {
		return;
	}
	yield put(actions.listaLocal(productoAll));
}

export function* actualizacionLista() {
	yield takeEvery(ACTUALIZACION_LISTA, readAllProducto);
}

export default actualizacionLista;
