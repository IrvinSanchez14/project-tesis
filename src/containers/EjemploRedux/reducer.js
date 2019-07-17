import * as ACTIONS from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
	reduxEjemplo: undefined,
});

export default function(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.REDUX_CARGA: {
			return state.set('reduxEjemplo', action.name);
		}
		case ACTIONS.REDUX_SET_DATA: {
			return state.set('data', action.raul);
		}
		default:
			return state;
	}
}
