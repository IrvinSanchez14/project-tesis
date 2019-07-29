import * as ACTIONS from './constants';

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

export function editTipo() {
	return {
		type: ACTIONS.EDIT_TIPO,
	};
}

export const idSelectedTipoUsuario = id => {
	return {
		type: ACTIONS.ID_SELECTED_TIPOUSUARIO,
		id: id,
	};
};

export function editTipousuario(formValues) {
	return {
		type: ACTIONS.EDIT_TIPOUSUARIO,
		data: formValues,
	};
}

export function creacionRegistro() {
	return {
		type: ACTIONS.CREACION_REGISTRO,
		erase: undefined,
	};
}

export function autorizacionFormFail(value) {
	return {
		type: ACTIONS.AUTORIZACION_FORM_FAIL,
		estado: value,
	};
}
