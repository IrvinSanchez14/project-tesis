import { put, call, takeEvery } from 'redux-saga/effects';

import api from '../../api';
import { FETCH_USUARIOS } from './constants';
import * as actions from './actions';

export function* readAllUsuarios(action) {
	let informacion;
	try {
		informacion = yield call(api.get, '/user/readAll.php');
	} catch (err) {
		return;
	}
	yield put(actions.setUsuarioData(informacion.data));
}

export function* fetchTipoUsuario() {
	yield takeEvery(FETCH_USUARIOS, readAllUsuarios);
}

export default fetchTipoUsuario;
