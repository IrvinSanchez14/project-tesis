import { fromJS } from 'immutable';

import * as ACTIONS from './constants';

const initialState = fromJS({
	permisosUsuarioData: undefined,
});

export default function(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.SET_PERMISOSUSUARIOS_DATA: {
			return state.set('data', action.datos);
		}
		case ACTIONS.LISTA_PERMISO_USUARIO: {
			return state.set('infoPermisos', action.data);
		}
		case ACTIONS.ID_SELECTED_PERMISOSUSUARIOS: {
			return state.set('idSelected', action.id);
		}
		case ACTIONS.CREACION_REGISTRO_PERMISOSUSUARIOS: {
			return state.set('idSelected', action.erase);
		}
		case ACTIONS.AUTORIZACION_FORM_FAIL: {
			return state.set('formularioRespuesta', action.estado);
		}
		default:
			return state;
	}
}
