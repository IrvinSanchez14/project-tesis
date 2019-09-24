import * as ACTIONS from './constants';

export const listaLocal = data => {
	return {
		type: ACTIONS.LISTAEXISTENTE_CREADA,
		data: data,
	};
};

export const actualizacionLista = () => {
	return {
		type: ACTIONS.ACTUALIZACION_LISTA,
	};
};
