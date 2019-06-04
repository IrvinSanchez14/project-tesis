import { put, call, takeEvery } from 'redux-saga/effects';

import api from '../../api';
import { FETCH_TIPOUSUARIO, EDIT_TIPOUSUARIO } from './constants';
import * as actions from './actions';

export function* readAllTipoUsuario(action) {
	let tipoUsuarioAll;
	try {
		tipoUsuarioAll = yield call(api.get, '/tipoUsuario/readAll.php');
	} catch (err) {
		return;
	}
	yield put(actions.setTipoUsuarioData(tipoUsuarioAll.data));
}

export function* editUsuarioTipo(frmValues) {
	let tipoUsuarioAll;
	try {
		tipoUsuarioAll = yield call(api.put, '/tipoUsuario/update.php', frmValues);
	} catch (err) {
		return;
	}
	yield put(actions.editTipousuario(tipoUsuarioAll));
}

export function* fetchTipoUsuario() {
	yield takeEvery(FETCH_TIPOUSUARIO, readAllTipoUsuario);
}

export function* editTipo() {
	yield takeEvery(EDIT_TIPOUSUARIO, editUsuarioTipo);
}

export default [fetchTipoUsuario, editTipo];
