import { put, call, takeEvery } from 'redux-saga/effects';

import api from '../../api';
import { REDUX_FETCH } from './constants';
import * as actions from './actions';

export function* todaData(action) {
	let reduxDatos;
	try {
		reduxDatos = yield call(api.get, '/UnidadMedida/readAll.php');
		console.log(reduxDatos);
	} catch (err) {
		return;
	}
	yield put(actions.setReduxDataData(reduxDatos.data));
}

export function* fetchReduxData() {
	yield takeEvery(REDUX_FETCH, todaData);
}

export default fetchReduxData;
