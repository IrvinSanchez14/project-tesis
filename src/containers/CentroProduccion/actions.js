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
