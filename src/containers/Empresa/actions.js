import * as ACTIONS from './constants';

export const setEmpresaData = datosTipoUsuario => {
	return {
		type: ACTIONS.SET_EMPRESA_DATA,
		datos: datosTipoUsuario,
	};
};

export function fetchEmpresa() {
	return {
		type: ACTIONS.FETCH_EMPRESA,
	};
}

export function editTipo() {
	return {
		type: ACTIONS.EDIT_TIPO,
	};
}

export const idSelectedEmpresa = id => {
	return {
		type: ACTIONS.ID_SELECTED_EMPRESA,
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

export function editEmpresa(formValues) {
	return {
		type: ACTIONS.EDIT_EMPRESA,
		data: formValues,
	};
}

export function creacionRegistro() {
	return {
		type: ACTIONS.CREACION_REGISTRO,
		erase: undefined,
	};
}
