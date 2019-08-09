import { put, call, takeEvery } from 'redux-saga/effects';

import api from '../../api';
import { FETCH_PORCIONES } from './constants';
import * as actions from './actions';

export function* readAllPorciones(action) {
	let informacion;
	try {
		informacion = yield call(api.get, '/Porcion/readAll.php');
	} catch (err) {
		return;
	}
	yield put(actions.setPorcionesData(informacion.data));
}

export function* fetchPorciones() {
	yield takeEvery(FETCH_PORCIONES, readAllPorciones);
}

export default fetchPorciones;
