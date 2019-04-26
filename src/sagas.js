import { all, fork } from 'redux-saga/effects';
import TipoUsuarioSagas from './containers/TipoUsuario/sagas';
// import watchers from other files
export default function* rootSaga() {
	const allSagas = [...TipoUsuarioSagas];
	for (let i = 0; i < allSagas.length; i += 1) {
		yield fork(allSagas[i]);
	}
}
