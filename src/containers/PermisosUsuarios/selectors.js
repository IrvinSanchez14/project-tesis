import { createSelector } from 'reselect';

export const dataPermisosUsuarios = state => state.getIn(['permisosUsuarios', 'data']);

export const getIdPermisosUsuarios = state => state.getIn(['permisosUsuarios', 'idSelected']);

export const getFormResponse = state => state.getIn(['permisosUsuarios', 'formularioRespuesta']);

export const getPermisosUsuario = state => state.getIn(['permisosUsuarios', 'infoPermisos']);

export const dataPermiso = state => state.getIn(['permiso', 'data']);

export const permisosDisponibles = createSelector(
	getPermisosUsuario,
	dataPermiso,
	(permisosUsuario, permisos) => {
		let permisosOn;
		if (permisosUsuario) {
			const permisoUsuarioIDs = permisosUsuario.map(us => parseInt(us.IdPermiso));
			permisosOn = permisos.filter(PNA => !permisoUsuarioIDs.includes(PNA.IdPermiso));
		}
		return permisosOn;
	}
);

export const getDataId = createSelector(
	dataPermisosUsuarios,
	getIdPermisosUsuarios,
	(dataTipo, idUsuario) => {
		let dataId;
		if (dataTipo) {
			dataId = [];
			dataTipo.forEach(data => {
				if (data.IdUsuario === idUsuario) {
					dataId.push({
						id: data.IdUsuario,
						Estado: data.estadoTexto,
					});
				}
			});
		}
		return dataId;
	}
);

export const getDataBodyId = createSelector(
	dataPermisosUsuarios,
	getIdPermisosUsuarios,
	(dataTipo, idUsuario) => {
		let dataBody;
		let d;
		if (dataTipo) {
			dataBody = [];
			dataTipo.forEach(data => {
				if (data.IdUsuario === idUsuario) {
					dataBody.push({
						Email: data.Email,
						NombreUsuario: data.NombreUsuario,
						NombreTipo: data.NombreTipo,
					});
					d = {
						IdUsuario: data.IdUsuario,
						Email: data.Email,
						NombreUsuario: data.NombreUsuario,
						NombreTipo: data.NombreTipo,
						Estado: data.estadoTexto,
					};
				}
			});
		}
		return d;
	}
);
