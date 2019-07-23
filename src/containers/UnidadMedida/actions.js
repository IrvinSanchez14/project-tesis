import * as ACTIONS from './constants';

export const setUnidadMedidaData = datosTipoUsuario => {
	return {
		type: ACTIONS.SET_UNIDADMEDIDA_DATA,
		datos: datosTipoUsuario,
	};
};

export function fetchUnidadMedida() {
	return {
		type: ACTIONS.FETCH_UNIDADMEDIDA,
	};
}

export function editTipo() {
	return {
		type: ACTIONS.EDIT_TIPO,
	};
}

export const idSelectedUnidadMedida = id => {
	return {
		type: ACTIONS.ID_SELECTED_UNIDADMEDIDA,
		id: id,
	};
};

export function editUnidadMedida(formValues) {
	return {
		type: ACTIONS.EDIT_UNIDADMEDIDA,
		data: formValues,
	};
}

export function creacionRegistro() {
	return {
		type: ACTIONS.CREACION_REGISTRO_UNIDADMEDIDA,
		erase: undefined,
	};
}
