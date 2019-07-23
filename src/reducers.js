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
});

export default appReducer;
