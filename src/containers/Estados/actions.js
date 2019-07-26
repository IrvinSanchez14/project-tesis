import * as ACTIONS from './constants';

export const setEstadosData = datosEstados => {
	return {
		type: ACTIONS.SET_ESTADOS_DATA,
		datos: datosEstados,
	};
};

export function fetchEstados() {
	return {
		type: ACTIONS.FETCH_ESTADOS,
	};
}

export function editTipo() {
	return {
		type: ACTIONS.EDIT_TIPO,
	};
}

export const idSelectedEstados = id => {
	return {
		type: ACTIONS.ID_SELECTED_ESTADOS,
		id: id,
	};
};

export function editEstados(formValues) {
	return {
		type: ACTIONS.EDIT_ESTADOS,
		data: formValues,
	};
}

export function creacionRegistro() {
	return {
		type: ACTIONS.CREACION_REGISTRO_ESTADOS,
		erase: undefined,
	};
}
