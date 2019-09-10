import { put, call, takeEvery } from 'redux-saga/effects';

import api from '../../api';
import { FETCH_DATA_FACTURA } from './constants';
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

export default fetchFactura;
