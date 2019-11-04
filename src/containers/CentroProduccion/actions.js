import * as ACTIONS from './constants';

export const setDataFactura = datos => {
	return {
		type: ACTIONS.SET_DATA_FACTURA,
		datos: datos,
	};
};

export function fetchFactura() {
	return {
		type: ACTIONS.FETCH_DATA_FACTURA,
	};
}

export const setDataProduccion = datos => {
	return {
		type: ACTIONS.SET_DATA_PRODUCCION,
		datos: datos,
	};
};

export function fetchProduccion() {
	return {
		type: ACTIONS.FETCH_DATA_PRODUCCION,
	};
}

export function fetchProduccionDetalle(id) {
	return {
		type: ACTIONS.FETCH_DATA_DETALLE_PRODUCCION,
		id: id,
	};
}

export const setDataDetalleProduccion = datos => {
	return {
		type: ACTIONS.SET_DATA_DETALLE_PRODUCCION,
		datos: datos,
	};
};

export const updateDetalleCantidad = (cantidad, index) => {
	return {
		type: ACTIONS.UPDATE_DETALLE_CANTIDAD,
		cantidad: cantidad,
		index: index,
	};
};

export function activateModal(flag) {
	return {
		type: ACTIONS.ACTIVATE_MODAL_PRODUCCION,
		estado: flag,
	};
}

export function activateToastConfirm(flag) {
	return {
		type: ACTIONS.ACTIVATE_TOAST_CONFIRM,
		estado: flag,
	};
}

export function updateTabla() {
	return {
		type: ACTIONS.UPDATE_TABLA_PRODUCCION,
	};
}
