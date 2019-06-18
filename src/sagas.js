import { fork } from 'redux-saga/effects';
import TipoUsuarioSagas from './containers/TipoUsuario/sagas';
import LoginSaga from './containers/Login/sagas';

export default function* rootSaga() {
	const allSagas = [...TipoUsuarioSagas, LoginSaga];
	for (let i = 0; i < allSagas.length; i += 1) {
		yield fork(allSagas[i]);
	}
}
