import { put, call, takeEvery } from 'redux-saga/effects';

import api from '../../api';
import { FETCH_PRODUCTO } from './constants';
import * as actions from './actions';

export function* readAllProducto(action) {
	let productoAll;
	try {
		productoAll = yield call(api.get, '/Producto/readAll.php');
	} catch (err) {
		return;
	}
	yield put(actions.setProductoData(productoAll.data));
}

export function* fetchProducto() {
	yield takeEvery(FETCH_PRODUCTO, readAllProducto);
}

export default fetchProducto;
