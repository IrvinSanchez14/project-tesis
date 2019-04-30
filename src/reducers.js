import { combineReducers } from 'redux-immutable';
import { reducer as reduxFormReducer } from 'redux-form/immutable';
import login from './containers/Login/reducer';
import tipoUsuario from './containers/TipoUsuario/reducer';
import App from './containers/App/reducer';

const appReducer = combineReducers({
	form: reduxFormReducer,
	login,
	tipoUsuario,
	App,
});

export default appReducer;
