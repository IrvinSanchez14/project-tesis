import { fromJS } from 'immutable';

import * as ACTIONS from './constants';

const initialState = fromJS({
	listaExistenteData: undefined,
});

export default function(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.LISTAEXISTENTE_CREADA: {
			return state.set('data', action.data);
		}
		default:
			return state;
	}
}
