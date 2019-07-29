import { fork } from 'redux-saga/effects';
import TipoUsuarioSagas from './containers/TipoUsuario/sagas';
import LoginSaga from './containers/Login/sagas';
import RegistroSaga from './containers/Registro/sagas';
import EmpresaSagas from './containers/Empresa/sagas';
import fetchReduxData from './containers/EjemploRedux/sagas';
import UnidadMedidaSagas from './containers/UnidadMedida/sagas';
import SucursalSagas from './containers/Sucursales/sagas';
import ProductoSagas from './containers/Productos/sagas';
import TipoProductoSagas from './containers/TipoProducto/sagas';
import ProveedorSagas from './containers/Proveedor/sagas';
import PermisoSagas from './containers/Permisos/sagas';
import EstadosSagas from './containers/Estados/sagas';
import PermisosUsuariosSagas from './containers/PermisosUsuarios/sagas';

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
		TipoProductoSagas,
		ProveedorSagas,
		PermisoSagas,
		EstadosSagas,
		...PermisosUsuariosSagas,
	];
	for (let i = 0; i < allSagas.length; i += 1) {
		yield fork(allSagas[i]);
	}
}
