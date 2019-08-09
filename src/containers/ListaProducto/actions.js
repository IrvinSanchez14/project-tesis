import * as ACTIONS from './constants';

export const setListadoProductosData = datosProducto => {
	return {
		type: ACTIONS.SET_LISTADOPRODUCTOS_DATA,
		datos: datosProducto,
	};
};

export function fetchListadoProductos() {
	return {
		type: ACTIONS.FETCH_LISTADOPRODUCTOS,
	};
}

export function editTipo() {
	return {
		type: ACTIONS.EDIT_TIPO,
	};
}

export const idSelectedListadoProductos = id => {
	return {
		type: ACTIONS.ID_SELECTED_LISTADOPRODUCTOS,
		id: id,
	};
};

export function editListadoPorciones(formValues) {
	return {
		type: ACTIONS.EDIT_LISTADOPRODUCTOS,
		data: formValues,
	};
}

export function creacionRegistro() {
	return {
		type: ACTIONS.CREACION_REGISTRO_LISTADOPRODUCTOS,
		erase: undefined,
	};
}

export function autorizacionFormFail(value) {
	return {
		type: ACTIONS.AUTORIZACION_FORM_FAIL,
		estado: value,
	};
}
