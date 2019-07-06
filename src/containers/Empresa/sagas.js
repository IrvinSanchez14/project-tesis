import { put, call, takeEvery } from 'redux-saga/effects';

import api from '../../api';
import { FETCH_EMPRESA } from './constants';
import * as actions from './actions';

export function* readAllEmpresa(action) {
	let empresaAll;
	try {
		empresaAll = yield call(api.get, '/Empresas/readAll.php');
	} catch (err) {
		return;
	}
	yield put(actions.setEmpresaData(empresaAll.data));
}

/*export function* editUsuarioTipo(frmValues) {
	let tipoUsuarioAll;
	try {
		tipoUsuarioAll = yield call(api.put, '/tipoUsuario/update.php', frmValues);
	} catch (err) {
		return;
	}
	yield put(actions.editTipousuario(tipoUsuarioAll));
}*/

export function* fetchTipoUsuario() {
	yield takeEvery(FETCH_EMPRESA, readAllEmpresa);
}

/*export function* editTipo() {
	yield takeEvery(EDIT_TIPOUSUARIO, editUsuarioTipo);
}*/

export default fetchTipoUsuario;
