import { combineReducers } from 'redux-immutable';
import { reducer as reduxFormReducer } from 'redux-form/immutable';
import login from './containers/Login/reducer';
import tipoUsuario from './containers/TipoUsuario/reducer';
import empresa from './containers/Empresa/reducer';
import Registro from './containers/Registro/reducer';
import App from './containers/App/reducer';
import ReduxEjemplo from './containers/EjemploRedux/reducer';

const appReducer = combineReducers({
	form: reduxFormReducer,
	login,
	tipoUsuario,
	App,
	Registro,
	empresa,
	ReduxEjemplo,
});

export default appReducer;
