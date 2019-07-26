import * as ACTIONS from './constants';

export const setPermisoData = datosPermiso => {
	return {
		type: ACTIONS.SET_PERMISO_DATA,
		datos: datosPermiso,
	};
};

export function fetchPermiso() {
	return {
		type: ACTIONS.FETCH_PERMISO,
	};
}

export function editTipo() {
	return {
		type: ACTIONS.EDIT_TIPO,
	};
}

export const idSelectedPermiso = id => {
	return {
		type: ACTIONS.ID_SELECTED_PERMISO,
		id: id,
	};
};

export function editPermiso(formValues) {
	return {
		type: ACTIONS.EDIT_PERMISO,
		data: formValues,
	};
}

export function creacionRegistro() {
	return {
		type: ACTIONS.CREACION_REGISTRO_PERMISO,
		erase: undefined,
	};
}
