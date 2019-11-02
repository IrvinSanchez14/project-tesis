import * as ACTIONS from './constants';

export function clickFactura(estado) {
	return {
		type: ACTIONS.CLICK_FACTURA,
		estado: estado,
	};
}

export function checkCabeceraFactura(array, flag) {
	return {
		type: ACTIONS.CHECK_CABECERA_FACTURA,
		informacion: array,
		bandera: flag,
	};
}

export function removeBanderaCabecera(flag) {
	return {
		type: ACTIONS.BANDERA_CABECERA_REMOVE,
		flag: flag,
	};
}

export function checkDetalleFactura(array, flag) {
	return {
		type: ACTIONS.CHECK_DETALLE_FACTURA,
		detalle: array,
		flag: flag,
	};
}

export const actualizacionListaFacturaDetalle = () => {
	return {
		type: ACTIONS.ACTUALIZACION_LISTA_FACTURA_DETALLE,
	};
};
