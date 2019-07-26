import { put, call, takeEvery } from 'redux-saga/effects';

import api from '../../api';
import { FETCH_ESTADOS } from './constants';
import * as actions from './actions';

export function* readAllEstados(action) {
	let estados;
	try {
		estados = yield call(api.get, '/Estado/readAll.php');
	} catch (err) {
		return;
	}
	yield put(actions.setEstadosData(estados.data));
}

export function* fetchEstadps() {
	yield takeEvery(FETCH_ESTADOS, readAllEstados);
}

export default fetchEstadps;
