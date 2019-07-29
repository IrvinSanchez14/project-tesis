import * as ACTIONS from './constants';

export const setProductoData = datosProductos => {
	return {
		type: ACTIONS.SET_PRODUCTO_DATA,
		datos: datosProductos,
	};
};

export function fetchProducto() {
	return {
		type: ACTIONS.FETCH_PRODUCTO,
	};
}

export function editTipo() {
	return {
		type: ACTIONS.EDIT_TIPO,
	};
}

export const idSelectedProducto = id => {
	return {
		type: ACTIONS.ID_SELECTED_PRODUCTO,
		id: id,
	};
};

export function editProducto(formValues) {
	return {
		type: ACTIONS.EDIT_PRODUCTO,
		data: formValues,
	};
}

export function creacionRegistro() {
	return {
		type: ACTIONS.CREACION_REGISTRO_PRODUCTO,
		erase: undefined,
	};
}

export function autorizacionFormFail(value) {
	return {
		type: ACTIONS.AUTORIZACION_FORM_FAIL,
		estado: value,
	};
}
