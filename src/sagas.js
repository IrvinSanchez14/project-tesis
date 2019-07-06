import { fork } from 'redux-saga/effects';
import TipoUsuarioSagas from './containers/TipoUsuario/sagas';
import LoginSaga from './containers/Login/sagas';
import RegistroSaga from './containers/Registro/sagas';
import EmpresaSagas from './containers/Empresa/sagas';

export default function* rootSaga() {
	const allSagas = [...TipoUsuarioSagas, LoginSaga, RegistroSaga, EmpresaSagas];
	for (let i = 0; i < allSagas.length; i += 1) {
		yield fork(allSagas[i]);
	}
}
