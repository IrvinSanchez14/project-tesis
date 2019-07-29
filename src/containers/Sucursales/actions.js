import * as ACTIONS from './constants';

export const setSucursalData = datosTipoUsuario => {
	return {
		type: ACTIONS.SET_SUCURSAL_DATA,
		datos: datosTipoUsuario,
	};
};

export function fetchSucursal() {
	return {
		type: ACTIONS.FETCH_SUCURSAL,
	};
}

export function editTipo() {
	return {
		type: ACTIONS.EDIT_TIPO,
	};
}

export const idSelectedSucursal = id => {
	return {
		type: ACTIONS.ID_SELECTED_SUCURSAL,
		id: id,
	};
};

export function editSucursal(formValues) {
	return {
		type: ACTIONS.EDIT_SUCURSAL,
		data: formValues,
	};
}

export function creacionRegistro() {
	return {
		type: ACTIONS.CREACION_REGISTRO_SUCURSAL,
		erase: undefined,
	};
}

export function autorizacionFormFail(value) {
	return {
		type: ACTIONS.AUTORIZACION_FORM_FAIL,
		estado: value,
	};
}
