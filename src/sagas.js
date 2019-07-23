import { fork } from 'redux-saga/effects';
import TipoUsuarioSagas from './containers/TipoUsuario/sagas';
import LoginSaga from './containers/Login/sagas';
import RegistroSaga from './containers/Registro/sagas';
import EmpresaSagas from './containers/Empresa/sagas';
import fetchReduxData from './containers/EjemploRedux/sagas';
import UnidadMedidaSagas from './containers/UnidadMedida/sagas';
import SucursalSagas from './containers/Sucursales/sagas';
import ProductoSagas from './containers/Productos/sagas';

export default function* rootSaga() {
	const allSagas = [
		...TipoUsuarioSagas,
		LoginSaga,
		RegistroSaga,
		EmpresaSagas,
		fetchReduxData,
		UnidadMedidaSagas,
		SucursalSagas,
		ProductoSagas,
	];
	for (let i = 0; i < allSagas.length; i += 1) {
		yield fork(allSagas[i]);
	}
}
