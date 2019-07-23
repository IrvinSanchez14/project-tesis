import { put, call, takeEvery } from 'redux-saga/effects';

import api from '../../api';
import { FETCH_UNIDADMEDIDA } from './constants';
import * as actions from './actions';

export function* readAllUnidadMedida(action) {
	let unidadMedidaAll;
	try {
		unidadMedidaAll = yield call(api.get, '/UnidadMedida/readAll.php');
	} catch (err) {
		return;
	}
	yield put(actions.setUnidadMedidaData(unidadMedidaAll.data));
}

export function* fetchUnidadMedida() {
	yield takeEvery(FETCH_UNIDADMEDIDA, readAllUnidadMedida);
}

export default fetchUnidadMedida;
