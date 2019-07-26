import { PERMISO_VER_COMPONENT } from './constants';

export const permisoVerTipoUsuario = respuesta => {
	const userPermisos = JSON.parse(localStorage.getItem('userPermisos'));
	if (userPermisos !== null) {
		userPermisos.map(permiso => {
			if (permiso.Nombre === PERMISO_VER_COMPONENT) {
				respuesta = true;
			}
			return respuesta;
		});
	} else {
		respuesta = false;
	}

	return respuesta;
};
