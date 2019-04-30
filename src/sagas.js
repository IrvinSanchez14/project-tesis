import { fork } from 'redux-saga/effects';
import TipoUsuarioSagas from './containers/TipoUsuario/sagas';
export default function* rootSaga() {
	const allSagas = [...TipoUsuarioSagas];
	for (let i = 0; i < allSagas.length; i += 1) {
		yield fork(allSagas[i]);
	}
}
