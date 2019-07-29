import * as ACTIONS from './constants';

export const setProveedorData = datosProveedor => {
	return {
		type: ACTIONS.SET_PROVEEDOR_DATA,
		datos: datosProveedor,
	};
};

export function fetchProveedor() {
	return {
		type: ACTIONS.FETCH_PROVEEDOR,
	};
}

export function editTipo() {
	return {
		type: ACTIONS.EDIT_TIPO,
	};
}

export const idSelectedProveedor = id => {
	return {
		type: ACTIONS.ID_SELECTED_PROVEEDOR,
		id: id,
	};
};

export function editProveedor(formValues) {
	return {
		type: ACTIONS.EDIT_PROVEEDOR,
		data: formValues,
	};
}

export function creacionRegistro() {
	return {
		type: ACTIONS.CREACION_REGISTRO_PROVEEDOR,
		erase: undefined,
	};
}

export function autorizacionFormFail(value) {
	return {
		type: ACTIONS.AUTORIZACION_FORM_FAIL,
		estado: value,
	};
}
