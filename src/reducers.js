import { combineReducers } from 'redux-immutable';
import { reducer as reduxFormReducer } from 'redux-form/immutable';
import login from './containers/Login/reducer';
import tipoUsuario from './containers/TipoUsuario/reducer';
import empresa from './containers/Empresa/reducer';
import Registro from './containers/Registro/reducer';
import App from './containers/App/reducer';
import ReduxEjemplo from './containers/EjemploRedux/reducer';
import unidadMedida from './containers/UnidadMedida/reducer';
import sucursal from './containers/Sucursales/reducer';
import producto from './containers/Productos/reducer';
import tipoProducto from './containers/TipoProducto/reducer';
import proveedor from './containers/Proveedor/reducer';
import permiso from './containers/Permisos/reducer';
import estados from './containers/Estados/reducer';
import permisosUsuarios from './containers/PermisosUsuarios/reducer';
import usuarios from './containers/Usuarios/reducer';
import porciones from './containers/Porciones/reducer';
import listadoProducto from './containers/ListaProducto/reducer';
import listaExistente from './containers/ListaExistente/reducer';

const appReducer = combineReducers({
	form: reduxFormReducer,
	login,
	tipoUsuario,
	App,
	Registro,
	empresa,
	ReduxEjemplo,
	unidadMedida,
	sucursal,
	producto,
	tipoProducto,
	proveedor,
	permiso,
	estados,
	permisosUsuarios,
	usuarios,
	porciones,
	listadoProducto,
	listaExistente,
});

export default appReducer;
