import { put, call, takeEvery } from 'redux-saga/effects';

import api from '../../api';
import { FETCH_SUCURSAL } from './constants';
import * as actions from './actions';

export function* readAllSucursales(action) {
	let sucursalAll;
	try {
		sucursalAll = yield call(api.get, '/Sucursales/readAll.php');
	} catch (err) {
		return;
	}
	yield put(actions.setSucursalData(sucursalAll.data));
}

export function* fetchSucursal() {
	yield takeEvery(FETCH_SUCURSAL, readAllSucursales);
}

export default fetchSucursal;
