import * as ACTIONS from './constants';
import api from '../../api';

export const setTipoUsuarioData = datosTipoUsuario => {
	return {
		type: ACTIONS.SET_TIPOUSUARIO_DATA,
		datos: datosTipoUsuario,
	};
};

export function fetchTipoUsuario() {
	return {
		type: ACTIONS.FETCH_TIPOUSUARIO,
	};
}

export const idSelectedTipoUsuario = id => {
	return {
		type: ACTIONS.ID_SELECTED_TIPOUSUARIO,
		id: id,
	};
};

export function sagaread(authParams) {
	return {
		type: ACTIONS.LOGIN_WATCHER,
		payload: authParams,
	};
}

export function authError(error) {
	return { type: 'AUTH_ERROR', error };
}
