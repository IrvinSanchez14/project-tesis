import * as ACTIONS from './constants';

export const setUsuarioData = datosUsuarios => {
	return {
		type: ACTIONS.SET_USUARIOS_DATA,
		datos: datosUsuarios,
	};
};

export function fetchUsuarios() {
	return {
		type: ACTIONS.FETCH_USUARIOS,
	};
}

export function editTipo() {
	return {
		type: ACTIONS.EDIT_TIPO,
	};
}

export const idSelectedUsuarios = id => {
	return {
		type: ACTIONS.ID_SELECTED_USUARIOS,
		id: id,
	};
};

export function editUsuarios(formValues) {
	return {
		type: ACTIONS.EDIT_USUARIOS,
		data: formValues,
	};
}

export function creacionRegistro() {
	return {
		type: ACTIONS.CREACION_REGISTRO_USUARIOS,
		erase: undefined,
	};
}

export function autorizacionFormFail(value) {
	return {
		type: ACTIONS.AUTORIZACION_FORM_FAIL,
		estado: value,
	};
}
