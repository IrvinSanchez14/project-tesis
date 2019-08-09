import * as ACTIONS from './constants';

export const setPorcionesData = datosPorciones => {
	return {
		type: ACTIONS.SET_PORCIONES_DATA,
		datos: datosPorciones,
	};
};

export function fetchPorciones() {
	return {
		type: ACTIONS.FETCH_PORCIONES,
	};
}

export function editTipo() {
	return {
		type: ACTIONS.EDIT_TIPO,
	};
}

export const idSelectedPorciones = id => {
	return {
		type: ACTIONS.ID_SELECTED_PORCIONES,
		id: id,
	};
};

export function editPorciones(formValues) {
	return {
		type: ACTIONS.EDIT_PORCIONES,
		data: formValues,
	};
}

export function creacionRegistro() {
	return {
		type: ACTIONS.CREACION_REGISTRO_PORCIONES,
		erase: undefined,
	};
}

export function autorizacionFormFail(value) {
	return {
		type: ACTIONS.AUTORIZACION_FORM_FAIL,
		estado: value,
	};
}
