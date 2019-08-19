import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { apiHandle } from '../../helpers/apiHandle';
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_UNSUCCESS } from './constants';
import { conn } from '../../api';
//import { SET_USER_INFO } from '../user/constants';

function loginApi(email, password) {
	try {
		const body = {
			Email: email,
			Passwd: password,
		};
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const endpoint = `${conn}/user/login.php`;
		const apiOptions = {
			body: body,
			config: config,
			endpoint: endpoint,
		};

		return apiHandle(apiOptions).post();
	} catch (error) {
		console.log(error);
	}
}

function permisosRequest(id) {
	try {
		const body = {
			IdUsuario: id,
		};
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const endpoint = `${conn}/user/permisos.php`;
		const apiOptions = {
			body: body,
			config: config,
			endpoint: endpoint,
		};

		return apiHandle(apiOptions).post();
	} catch (error) {
		console.log(error);
	}
}

function* loginFlow(action) {
	try {
		const { email, password } = action;
		const response = yield call(loginApi, email, password);
		if (response.data.message !== 'Login failed.' && response.data.activacion === '0') {
			const permisosCall = yield call(permisosRequest, response.data.user.IdUsuario);
			localStorage['token'] = JSON.stringify(response.data.jwt);
			localStorage['userInfo'] = JSON.stringify(response.data.user);
			localStorage['userPermisos'] = JSON.stringify(permisosCall.data);
			yield put({ type: LOGIN_SUCCESS, response: response, datos: permisosCall.data });
			//yield put({ type: LOGIN_PERMISOS_USUARIO, datos: permisosCall.data });
			yield put(push('/'));
		} else if (response.data.activacion === '1') {
			alert(response.data.error);
			localStorage['firsTime'] = JSON.stringify(response.data.IdUsuario);
			yield put(push('/CambioPassword'));
		} else {
			alert(response.data.error);
			yield put({ type: LOGIN_UNSUCCESS, response });
		}
	} catch (error) {
		yield put({ type: LOGIN_ERROR, error });
	}
}

function* loginWatcher() {
	yield takeLatest(LOGIN_REQUESTING, loginFlow);
}

export default loginWatcher;
