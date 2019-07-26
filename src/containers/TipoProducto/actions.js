import * as ACTIONS from './constants';

export const setTipoProductoData = datosTipoProducto => {
	return {
		type: ACTIONS.SET_TIPOPRODUCTO_DATA,
		datos: datosTipoProducto,
	};
};

export function fetchTipoProducto() {
	return {
		type: ACTIONS.FETCH_TIPOPRODUCTO,
	};
}

export function editTipo() {
	return {
		type: ACTIONS.EDIT_TIPO,
	};
}

export const idSelectedTipoProducto = id => {
	return {
		type: ACTIONS.ID_SELECTED_TIPOPRODUCTO,
		id: id,
	};
};

export function editTipoProducto(formValues) {
	return {
		type: ACTIONS.EDIT_TIPOPRODUCTO,
		data: formValues,
	};
}

export function creacionRegistro() {
	return {
		type: ACTIONS.CREACION_REGISTRO_TIPOPRODUCTO,
		erase: undefined,
	};
}
