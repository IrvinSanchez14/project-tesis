import { put, call, takeEvery } from 'redux-saga/effects';

import api from '../../api';
import { FETCH_PROVEEDOR } from './constants';
import * as actions from './actions';

export function* readAllProveedor(action) {
	let proveedorAll;
	try {
		proveedorAll = yield call(api.get, '/Proveedor/readAll.php');
	} catch (err) {
		return;
	}
	yield put(actions.setProveedorData(proveedorAll.data));
}

export function* fetchProveedor() {
	yield takeEvery(FETCH_PROVEEDOR, readAllProveedor);
}

export default fetchProveedor;
