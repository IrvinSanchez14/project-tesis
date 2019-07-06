import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { apiHandle } from '../../helpers/apiHandle';
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_UNSUCCESS } from './constants';
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
		const endpoint = `http://localhost/tesis/api-jws/api/user/login.php`;
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
		if (response.data.message) {
			localStorage['token'] = JSON.stringify(response.data.jwt);
			yield put({ type: LOGIN_SUCCESS, response });
			//yield put({ type: SET_USER_INFO, response: response.data.user });
			yield put(push('/'));
		} else {
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
