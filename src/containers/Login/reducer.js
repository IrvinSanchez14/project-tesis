import { fromJS } from 'immutable';

import * as ACTIONS from './constants';

const initialState = fromJS({
	requesting: false,
	successful: false,
	messages: [],
	errors: [],
	permisos: undefined,
});

export default function(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.LOGIN_REQUESTING: {
			return {
				requesting: true,
				successful: false,
				messages: [],
				errors: [],
			};
		}
		case ACTIONS.LOGIN_SUCCESS:
			return {
				requesting: false,
				successful: true,
				messages: [
					{
						body: `${action.response.data.message}`,
					},
				],
				permisos: action.datos,
				errors: [],
			};
		case ACTIONS.LOGOUT_SUCCESSFUL:
			return {
				requesting: false,
				successful: false,
				messages: [
					{
						body: `${action.message}`,
					},
				],
				errors: [],
			};
		case ACTIONS.LOGIN_PERMISOS_USUARIO:
			return {
				requesting: false,
				successful: false,
				messages: [
					{
						body: `${action.datos}`,
					},
				],
				errors: [],
			};
		default:
			return state;
	}
}
