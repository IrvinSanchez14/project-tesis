import { put, call, takeEvery } from 'redux-saga/effects';

import api from '../../api';
import { FETCH_LISTADOPRODUCTOS } from './constants';
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

export default fetchListadoProductos;
