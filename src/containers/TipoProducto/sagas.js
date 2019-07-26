import { put, call, takeEvery } from 'redux-saga/effects';

import api from '../../api';
import { FETCH_TIPOPRODUCTO } from './constants';
import * as actions from './actions';

export function* readAllTipoProducto(action) {
	let tipoProductoAll;
	try {
		tipoProductoAll = yield call(api.get, '/TipoProducto/readAll.php');
	} catch (err) {
		return;
	}
	yield put(actions.setTipoProductoData(tipoProductoAll.data));
}

export function* fetchTipoProducto() {
	yield takeEvery(FETCH_TIPOPRODUCTO, readAllTipoProducto);
}

export default fetchTipoProducto;
