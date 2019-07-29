import { put, call, takeEvery } from 'redux-saga/effects';

import api from '../../api';
import { FETCH_PERMISOSUSUARIOS, FETCH_USUARIO_PERMISO } from './constants';
import * as actions from './actions';

export function* readAllPermisosUsuarios(action) {
	let informacion;
	try {
		informacion = yield call(api.get, '/permisoUsuario/readUsuarios.php');
	} catch (err) {
		return;
	}
	yield put(actions.setPermisosUsuariosData(informacion.data));
}

export function* readUsuarioPermiso(action) {
	let informacion;
	try {
		informacion = yield call(api.post, '/permisoUsuario/permisosUsuarios.php', { IdUsuario: action.id });
	} catch (err) {
		return;
	}
	yield put(actions.listaPermisosUsuarios(informacion.data));
}

export function* fetchPermisosUsuarios() {
	yield takeEvery(FETCH_PERMISOSUSUARIOS, readAllPermisosUsuarios);
}

export function* fetchUsuarioPermiso(id) {
	yield takeEvery(FETCH_USUARIO_PERMISO, readUsuarioPermiso);
}

export default [fetchPermisosUsuarios, fetchUsuarioPermiso];
