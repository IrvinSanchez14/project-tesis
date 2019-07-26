import { put, call, takeEvery } from 'redux-saga/effects';

import api from '../../api';
import { FETCH_PERMISO } from './constants';
import * as actions from './actions';

export function* readAllPermiso(action) {
	let permiso;
	try {
		permiso = yield call(api.get, '/Permisos/readAll.php');
	} catch (err) {
		return;
	}
	yield put(actions.setPermisoData(permiso.data));
}

export function* fetchPermiso() {
	yield takeEvery(FETCH_PERMISO, readAllPermiso);
}

export default fetchPermiso;
