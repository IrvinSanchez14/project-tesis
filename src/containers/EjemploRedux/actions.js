import * as ACTIONS from './constants';

export function reduxCarga(name) {
	return {
		type: ACTIONS.REDUX_CARGA,
		name: name,
	};
}

export const setReduxDataData = datos => {
	return {
		type: ACTIONS.REDUX_SET_DATA,
		raul: datos,
	};
};

export function fetchReduxData() {
	return {
		type: ACTIONS.REDUX_FETCH,
	};
}
