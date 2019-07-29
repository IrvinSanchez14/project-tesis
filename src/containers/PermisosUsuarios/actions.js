import * as ACTIONS from './constants';

export const setPermisosUsuariosData = datosPermisosUsuarios => {
	return {
		type: ACTIONS.SET_PERMISOSUSUARIOS_DATA,
		datos: datosPermisosUsuarios,
	};
};

export function fetchPermisosUsuarios() {
	return {
		type: ACTIONS.FETCH_PERMISOSUSUARIOS,
	};
}

export function fetchUsuarioPermiso(id) {
	return {
		type: ACTIONS.FETCH_USUARIO_PERMISO,
		id: id,
	};
}

export function editTipo() {
	return {
		type: ACTIONS.EDIT_TIPO,
	};
}

export const idSelectedPermisosUsuarios = id => {
	return {
		type: ACTIONS.ID_SELECTED_PERMISOSUSUARIOS,
		id: id,
	};
};

export const listaPermisosUsuarios = data => {
	return {
		type: ACTIONS.LISTA_PERMISO_USUARIO,
		data: data,
	};
};

export function editPermisosUsuarios(formValues) {
	return {
		type: ACTIONS.EDIT_PERMISOSUSUARIOS,
		data: formValues,
	};
}

export function creacionRegistro() {
	return {
		type: ACTIONS.CREACION_REGISTRO_PERMISOSUSUARIOS,
		erase: undefined,
	};
}

export function autorizacionFormFail(value) {
	return {
		type: ACTIONS.AUTORIZACION_FORM_FAIL,
		estado: value,
	};
}
