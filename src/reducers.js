import { combineReducers } from 'redux-immutable';
import login from './containers/Login/reducer';
import tipoUsuario from './containers/TipoUsuario/reducer';
import App from './containers/App/reducer';

const appReducer = combineReducers({
	login,
	tipoUsuario,
	App,
});

export default appReducer;
